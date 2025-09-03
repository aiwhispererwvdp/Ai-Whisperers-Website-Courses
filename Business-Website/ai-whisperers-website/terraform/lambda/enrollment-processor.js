/**
 * AWS Lambda Function: Course Enrollment Processor
 * Processes course enrollments and sends welcome emails via SES
 * Environment: ${environment}
 */

const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({ region: process.env.SES_REGION || 'us-east-1' });

exports.handler = async (event) => {
    console.log('Processing enrollment event:', JSON.stringify(event, null, 2));
    
    try {
        // Parse the enrollment data
        const enrollmentData = typeof event.body === 'string' 
            ? JSON.parse(event.body) 
            : event;

        const {
            courseId,
            courseName,
            studentEmail,
            studentName,
            orderId,
            amount,
            paymentMethod
        } = enrollmentData;

        // Validate required fields
        if (!courseId || !courseName || !studentEmail || !studentName) {
            throw new Error('Missing required enrollment data');
        }

        // Send welcome email to student
        await sendWelcomeEmail({
            courseId,
            courseName,
            studentEmail,
            studentName,
            orderId,
            amount
        });

        // Send notification to admin
        await sendAdminNotification({
            courseId,
            courseName,
            studentEmail,
            studentName,
            orderId,
            amount,
            paymentMethod
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                message: 'Enrollment processed successfully',
                enrollmentId: orderId
            })
        };

    } catch (error) {
        console.error('Enrollment processing failed:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};

async function sendWelcomeEmail({ courseId, courseName, studentEmail, studentName, orderId, amount }) {
    const courseAccessUrl = `https://$${process.env.DOMAIN_NAME}/courses/$${courseId}/welcome`;
    const supportUrl = `https://$${process.env.DOMAIN_NAME}/support`;
    
    const emailParams = {
        Source: `AI-Whisperers <courses@$${process.env.DOMAIN_NAME}>`,
        Destination: {
            ToAddresses: [studentEmail]
        },
        Message: {
            Subject: {
                Data: `Welcome to $${courseName}! Your AI Journey Starts Now 🚀`,
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Data: generateWelcomeEmailHtml({
                        courseName,
                        studentName,
                        courseAccessUrl,
                        supportUrl,
                        orderId,
                        amount
                    }),
                    Charset: 'UTF-8'
                },
                Text: {
                    Data: generateWelcomeEmailText({
                        courseName,
                        studentName,
                        courseAccessUrl,
                        supportUrl,
                        orderId,
                        amount
                    }),
                    Charset: 'UTF-8'
                }
            }
        }
    };

    const command = new SendEmailCommand(emailParams);
    await ses.send(command);
    
    console.log(`Welcome email sent to: $${studentEmail}`);
}

async function sendAdminNotification({ courseId, courseName, studentEmail, studentName, orderId, amount, paymentMethod }) {
    const emailParams = {
        Source: `AI-Whisperers System <noreply@$${process.env.DOMAIN_NAME}>`,
        Destination: {
            ToAddresses: [`support@$${process.env.DOMAIN_NAME}`]
        },
        Message: {
            Subject: {
                Data: `New Enrollment: $${courseName} - $${studentName}`,
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Data: `
                        <h2>New Course Enrollment</h2>
                        <p><strong>Course:</strong> $${courseName} ($${courseId})</p>
                        <p><strong>Student:</strong> $${studentName}</p>
                        <p><strong>Email:</strong> $${studentEmail}</p>
                        <p><strong>Order ID:</strong> $${orderId}</p>
                        <p><strong>Amount:</strong> $$${amount}</p>
                        <p><strong>Payment Method:</strong> $${paymentMethod || 'PayPal'}</p>
                        <p><strong>Environment:</strong> $${process.env.ENVIRONMENT}</p>
                        <p><strong>Timestamp:</strong> $${new Date().toISOString()}</p>
                    `,
                    Charset: 'UTF-8'
                }
            }
        }
    };

    const command = new SendEmailCommand(emailParams);
    await ses.send(command);
    
    console.log(`Admin notification sent for enrollment: $${orderId}`);
}

function generateWelcomeEmailHtml({ courseName, studentName, courseAccessUrl, supportUrl, orderId, amount }) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to $${courseName}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
                <h1 style="margin: 0; font-size: 28px;">Welcome to AI-Whisperers! 🎉</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px;">Your AI learning journey begins now</p>
            </div>

            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #495057; margin-top: 0;">Hi $${studentName}! 👋</h2>
                <p>Thank you for enrolling in <strong>${courseName}</strong>! We're thrilled to have you join our community of AI learners and innovators.</p>
                
                <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
                    <h3 style="color: #28a745; margin-top: 0;">📋 Enrollment Confirmed</h3>
                    <p><strong>Course:</strong> $${courseName}</p>
                    <p><strong>Order ID:</strong> $${orderId}</p>
                    <p><strong>Amount Paid:</strong> $$${amount}</p>
                </div>
            </div>

            <div style="background: #e7f3ff; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #0056b3; margin-top: 0;">🚀 Ready to Start Learning?</h3>
                <p>Your course is now available! Click the button below to access your first lesson:</p>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${courseAccessUrl}" style="display: inline-block; background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                        Access Your Course 🎯
                    </a>
                </div>
            </div>

            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #856404; margin-top: 0;">💡 What to Expect</h3>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li>Immediate access to all course materials</li>
                    <li>Lifetime access with free updates</li>
                    <li>Exclusive community access</li>
                    <li>Direct instructor support</li>
                    <li>Certificate of completion</li>
                </ul>
            </div>

            <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #0c5460; margin-top: 0;">📞 Need Help?</h3>
                <p>Our support team is here to help you succeed:</p>
                <ul style="margin: 15px 0; padding-left: 20px;">
                    <li>Email: <a href="mailto:support@ai-whisperers.com">support@ai-whisperers.com</a></li>
                    <li>Support Portal: <a href="${supportUrl}">Visit Support Center</a></li>
                    <li>Community: Access through your course dashboard</li>
                </ul>
            </div>

            <div style="text-align: center; padding: 20px; border-top: 2px solid #dee2e6; margin-top: 30px;">
                <p style="margin: 0; color: #6c757d;">
                    <strong>AI-Whisperers</strong><br>
                    Transforming Education with AI<br>
                    <a href="https://ai-whisperers.com">ai-whisperers.com</a>
                </p>
            </div>
        </body>
        </html>
    `;
}

function generateWelcomeEmailText({ courseName, studentName, courseAccessUrl, supportUrl, orderId, amount }) {
    return `
Welcome to AI-Whisperers, $${studentName}!

Thank you for enrolling in $${courseName}! We're thrilled to have you join our community of AI learners and innovators.

ENROLLMENT CONFIRMED:
- Course: $${courseName}
- Order ID: $${orderId}
- Amount Paid: $$${amount}

READY TO START LEARNING?
Your course is now available! Access your first lesson here:
$${courseAccessUrl}

WHAT TO EXPECT:
• Immediate access to all course materials
• Lifetime access with free updates
• Exclusive community access
• Direct instructor support
• Certificate of completion

NEED HELP?
Our support team is here to help you succeed:
• Email: support@ai-whisperers.com
• Support Portal: $${supportUrl}
• Community: Access through your course dashboard

Best regards,
The AI-Whisperers Team

AI-Whisperers - Transforming Education with AI
https://ai-whisperers.com
    `;
}