'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChartIcon,
  InfoCircledIcon 
} from '@radix-ui/react-icons';

interface ROIInputs {
  industry: string;
  employees: number;
  avgSalary: number;
  currentProcessTime: number; // hours per week
  aiReductionPercent: number; // percentage time saved
  implementationCost: number;
  monthlyAICost: number;
}

const industryDefaults = {
  'customer-service': {
    avgSalary: 45000,
    currentProcessTime: 40,
    aiReductionPercent: 60,
    implementationCost: 50000,
    monthlyAICost: 2000,
  },
  'marketing': {
    avgSalary: 65000,
    currentProcessTime: 30,
    aiReductionPercent: 45,
    implementationCost: 35000,
    monthlyAICost: 1500,
  },
  'finance': {
    avgSalary: 75000,
    currentProcessTime: 35,
    aiReductionPercent: 50,
    implementationCost: 75000,
    monthlyAICost: 3000,
  },
  'operations': {
    avgSalary: 55000,
    currentProcessTime: 45,
    aiReductionPercent: 55,
    implementationCost: 60000,
    monthlyAICost: 2500,
  },
};

export default function ROICalculatorDemo() {
  const [inputs, setInputs] = useState<ROIInputs>({
    industry: 'customer-service',
    employees: 10,
    avgSalary: 45000,
    currentProcessTime: 40,
    aiReductionPercent: 60,
    implementationCost: 50000,
    monthlyAICost: 2000,
  });

  const [results, setResults] = useState({
    annualSavings: 0,
    totalCosts: 0,
    netBenefit: 0,
    roiPercentage: 0,
    paybackMonths: 0,
    threeYearValue: 0,
  });

  // Update defaults when industry changes
  useEffect(() => {
    const defaults = industryDefaults[inputs.industry as keyof typeof industryDefaults];
    if (defaults) {
      setInputs(prev => ({
        ...prev,
        ...defaults,
      }));
    }
  }, [inputs.industry]);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    const calculateROI = () => {
      // Annual labor cost
      const annualLaborCost = inputs.employees * inputs.avgSalary;
      
      // Time savings calculation
      const weeklyHoursSaved = inputs.currentProcessTime * (inputs.aiReductionPercent / 100);
      const annualHoursSaved = weeklyHoursSaved * 52;
      const hourlyCost = inputs.avgSalary / (52 * 40); // Assuming 40-hour work week
      
      // Annual savings
      const annualSavings = annualHoursSaved * hourlyCost;
      
      // Annual AI costs
      const annualAICost = inputs.monthlyAICost * 12;
      const totalCosts = inputs.implementationCost + annualAICost;
      
      // ROI Calculations
      const netBenefit = annualSavings - annualAICost;
      const roiPercentage = ((netBenefit - inputs.implementationCost) / inputs.implementationCost) * 100;
      const paybackMonths = inputs.implementationCost / (netBenefit / 12);
      const threeYearValue = (netBenefit * 3) - inputs.implementationCost;
      
      setResults({
        annualSavings: Math.round(annualSavings),
        totalCosts: Math.round(totalCosts),
        netBenefit: Math.round(netBenefit),
        roiPercentage: Math.round(roiPercentage * 10) / 10,
        paybackMonths: Math.round(paybackMonths * 10) / 10,
        threeYearValue: Math.round(threeYearValue),
      });
    };

    calculateROI();
  }, [inputs]);

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value),
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Demo Header */}
      <div className="bg-gradient-to-br from-purple-50 to-amber-50 p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <BarChartIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              📊 AI ROI Calculator Demo
            </h3>
            <p className="text-gray-600">
              Calculate the business value of AI implementation for your organization
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <InfoCircledIcon className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Interactive Demo:</strong> Adjust the parameters below to see how AI investment ROI changes based on your specific scenario.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Input Parameters */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-gray-900">Business Parameters</h4>
          
          {/* Industry Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry/Department
            </label>
            <select
              value={inputs.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
            >
              <option value="customer-service">Customer Service</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance & Accounting</option>
              <option value="operations">Operations</option>
            </select>
          </div>

          {/* Number of Employees */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Employees Affected
            </label>
            <input
              type="number"
              value={inputs.employees}
              onChange={(e) => handleInputChange('employees', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              min="1"
              max="1000"
            />
          </div>

          {/* Average Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Annual Salary ($)
            </label>
            <input
              type="number"
              value={inputs.avgSalary}
              onChange={(e) => handleInputChange('avgSalary', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              step="1000"
              min="30000"
              max="200000"
            />
          </div>

          {/* Time Spent on Automatable Tasks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours/Week on AI-Automatable Tasks
            </label>
            <input
              type="number"
              value={inputs.currentProcessTime}
              onChange={(e) => handleInputChange('currentProcessTime', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              min="5"
              max="40"
            />
          </div>

          {/* AI Efficiency Gain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Time Savings with AI (%)
            </label>
            <div className="relative">
              <input
                type="range"
                value={inputs.aiReductionPercent}
                onChange={(e) => handleInputChange('aiReductionPercent', e.target.value)}
                className="w-full"
                min="20"
                max="80"
                step="5"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>20%</span>
                <span className="font-bold text-primary-600">{inputs.aiReductionPercent}%</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          {/* Implementation Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Cost ($)
            </label>
            <input
              type="number"
              value={inputs.implementationCost}
              onChange={(e) => handleInputChange('implementationCost', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              step="5000"
              min="10000"
              max="500000"
            />
          </div>

          {/* Monthly AI Costs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly AI Service Costs ($)
            </label>
            <input
              type="number"
              value={inputs.monthlyAICost}
              onChange={(e) => handleInputChange('monthlyAICost', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500"
              step="100"
              min="500"
              max="10000"
            />
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-gray-900">ROI Analysis Results</h4>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-success-50 border border-success-200 rounded-xl p-4 text-center">
              <div className="text-4xl mb-2">💰</div>
              <div className="text-2xl font-bold text-success-800">
                ${results.annualSavings.toLocaleString()}
              </div>
              <div className="text-sm text-success-600">Annual Savings</div>
            </div>

            <div className={`border rounded-xl p-4 text-center ${
              results.roiPercentage >= 100 
                ? 'bg-success-50 border-success-200' 
                : results.roiPercentage >= 50
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="text-4xl mb-2">
                {results.roiPercentage >= 100 ? '📈' : results.roiPercentage >= 50 ? '📊' : '📉'}
              </div>
              <div className={`text-2xl font-bold ${
                results.roiPercentage >= 100 
                  ? 'text-success-800' 
                  : results.roiPercentage >= 50
                  ? 'text-yellow-800'
                  : 'text-red-800'
              }`}>
                {results.roiPercentage}%
              </div>
              <div className={`text-sm ${
                results.roiPercentage >= 100 
                  ? 'text-success-600' 
                  : results.roiPercentage >= 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                Year 1 ROI
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h5 className="font-semibold text-gray-900 mb-4">Financial Breakdown</h5>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Annual Time Savings</span>
                <span className="font-semibold text-gray-900">
                  {Math.round((inputs.currentProcessTime * (inputs.aiReductionPercent / 100) * 52))} hours
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Annual Labor Savings</span>
                <span className="font-semibold text-success-700">
                  +${results.annualSavings.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Implementation Investment</span>
                <span className="font-semibold text-red-600">
                  -${inputs.implementationCost.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Annual AI Service Costs</span>
                <span className="font-semibold text-red-600">
                  -${(inputs.monthlyAICost * 12).toLocaleString()}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Net Annual Benefit</span>
                  <span className={`font-bold text-xl ${
                    results.netBenefit > 0 ? 'text-success-700' : 'text-red-600'
                  }`}>
                    ${results.netBenefit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Payback Period</span>
                <span className="font-bold text-primary-600">
                  {results.paybackMonths} months
                </span>
              </div>
            </div>
          </div>

          {/* 3-Year Projection */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChartIcon className="w-6 h-6 text-primary-600" />
              <h5 className="font-semibold text-gray-900">3-Year Projection</h5>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                ${results.threeYearValue.toLocaleString()}
              </div>
              <div className="text-sm text-primary-600 mb-4">
                Total 3-Year Value (after all costs)
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">Year 1</div>
                  <div className={`text-sm font-medium ${
                    results.netBenefit - inputs.implementationCost > 0 ? 'text-success-600' : 'text-red-600'
                  }`}>
                    ${(results.netBenefit - inputs.implementationCost).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Year 2</div>
                  <div className="text-success-600 text-sm font-medium">
                    ${results.netBenefit.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Year 3</div>
                  <div className="text-success-600 text-sm font-medium">
                    ${results.netBenefit.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Interpretation */}
          <div className={`border rounded-xl p-4 ${
            results.roiPercentage >= 200 
              ? 'bg-success-50 border-success-200'
              : results.roiPercentage >= 100
              ? 'bg-green-50 border-green-200' 
              : results.roiPercentage >= 50
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <h5 className={`font-semibold mb-2 ${
              results.roiPercentage >= 200 
                ? 'text-success-800'
                : results.roiPercentage >= 100
                ? 'text-green-800'
                : results.roiPercentage >= 50
                ? 'text-yellow-800'
                : 'text-red-800'
            }`}>
              Investment Analysis:
            </h5>
            <p className={`text-sm ${
              results.roiPercentage >= 200 
                ? 'text-success-700'
                : results.roiPercentage >= 100
                ? 'text-green-700'
                : results.roiPercentage >= 50
                ? 'text-yellow-700'
                : 'text-red-700'
            }`}>
              {results.roiPercentage >= 200 
                ? '🚀 Exceptional ROI - This AI investment is a clear financial winner!'
                : results.roiPercentage >= 100
                ? '✅ Strong ROI - This investment will pay for itself and generate profit.'
                : results.roiPercentage >= 50
                ? '⚠️ Moderate ROI - Consider optimizing costs or increasing efficiency gains.'
                : '❌ Low ROI - Review assumptions or consider alternative approaches.'
              }
            </p>
          </div>

          {/* Framework Teaser */}
          <div className="bg-gradient-to-br from-purple-50 to-amber-50 border border-purple-200 rounded-xl p-6 text-center">
            <h4 className="font-bold text-gray-900 mb-2">
              This is just one framework! 📈
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              In the full Enterprise AI course, you'll master 20+ strategic frameworks including 
              risk assessment, vendor evaluation, change management, and board presentation templates.
            </p>
            <div className="text-purple-600 font-medium text-sm">
              ✓ Strategic planning tools ✓ Risk management ✓ Board-ready templates ✓ Implementation roadmaps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}