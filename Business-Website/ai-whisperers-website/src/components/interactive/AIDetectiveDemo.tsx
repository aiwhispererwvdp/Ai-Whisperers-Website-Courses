'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  CheckIcon, 
  QuestionMarkCircledIcon,
  LightningBoltIcon 
} from '@radix-ui/react-icons';

const aiDetectiveItems = [
  {
    id: 'smartphone-camera',
    category: 'Smartphone',
    item: 'Camera Auto-Focus',
    description: 'Your phone camera automatically focuses on subjects and adjusts lighting',
    aiType: 'Computer Vision',
    difficulty: 'Obvious',
    hint: 'Notice how it recognizes faces and objects?',
    explanation: 'Uses machine learning models trained on millions of images to detect and focus on subjects automatically.',
  },
  {
    id: 'netflix-recommendations',
    category: 'Entertainment',
    item: 'Netflix Recommendations',
    description: 'Netflix suggests shows and movies you might like',
    aiType: 'Recommendation Algorithm',
    difficulty: 'Obvious',
    hint: 'How does it know what you\'ll enjoy?',
    explanation: 'Collaborative filtering and content-based algorithms analyze viewing patterns of millions of users to predict preferences.',
  },
  {
    id: 'google-autocomplete',
    category: 'Search',
    item: 'Google Search Suggestions',
    description: 'Google completes your search as you type',
    aiType: 'Natural Language Processing',
    difficulty: 'Hidden',
    hint: 'It predicts what you want to search for...',
    explanation: 'Neural networks analyze billions of search queries to predict and complete your search intent in real-time.',
  },
  {
    id: 'spam-filter',
    category: 'Email',
    item: 'Email Spam Filtering',
    description: 'Your email automatically sorts spam from legitimate messages',
    aiType: 'Classification Algorithm',
    difficulty: 'Hidden',
    hint: 'It learns what looks like spam...',
    explanation: 'Machine learning models analyze email patterns, sender reputation, and content to classify messages.',
  },
  {
    id: 'voice-assistant',
    category: 'Voice',
    item: 'Siri/Alexa Voice Recognition',
    description: 'Voice assistants understand and respond to spoken commands',
    aiType: 'Speech Recognition + NLP',
    difficulty: 'Obvious',
    hint: 'How does it understand different accents?',
    explanation: 'Deep neural networks convert speech to text, then natural language processing interprets intent and generates responses.',
  },
  {
    id: 'maps-traffic',
    category: 'Navigation',
    item: 'Google Maps Traffic Prediction',
    description: 'Maps apps predict traffic and suggest optimal routes',
    aiType: 'Predictive Analytics',
    difficulty: 'Hidden',
    hint: 'It knows traffic before it happens...',
    explanation: 'Machine learning models analyze historical traffic data, current conditions, and real-time user location data to predict congestion.',
  },
];

export default function AIDetectiveDemo() {
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleItemClick = (itemId: string) => {
    if (!foundItems.includes(itemId)) {
      const newFoundItems = [...foundItems, itemId];
      setFoundItems(newFoundItems);
      
      if (newFoundItems.length === aiDetectiveItems.length) {
        setGameCompleted(true);
      }
    }
    setSelectedItem(selectedItem === itemId ? null : itemId);
  };

  const selectedItemData = aiDetectiveItems.find(item => item.id === selectedItem);
  const completionPercentage = (foundItems.length / aiDetectiveItems.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Demo Header */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🕵️ AI Detective Hunt Demo
            </h3>
            <p className="text-gray-600">
              Find the hidden AI systems in everyday technology. Click on items to discover how AI powers them!
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {foundItems.length}/{aiDetectiveItems.length}
            </div>
            <div className="text-sm text-gray-500">Found</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Progress: {Math.round(completionPercentage)}%</span>
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {showHints ? 'Hide' : 'Show'} Hints
            </button>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="p-6">
        {gameCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-success-50 border border-success-200 rounded-xl"
          >
            <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-success-800 mb-4">
              🎉 Congratulations, AI Detective!
            </h3>
            <p className="text-success-700 mb-6">
              You've discovered all {aiDetectiveItems.length} hidden AI systems! You're ready to dive deeper into the world of artificial intelligence.
            </p>
            <div className="space-y-3">
              <div className="text-success-600 font-semibold">
                ✓ Identified {aiDetectiveItems.length} AI applications
              </div>
              <div className="text-success-600 font-semibold">
                ✓ Learned about different AI types
              </div>
              <div className="text-success-600 font-semibold">
                ✓ Ready for advanced AI education
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiDetectiveItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => handleItemClick(item.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  foundItems.includes(item.id)
                    ? 'bg-success-50 border-success-300 shadow-md'
                    : selectedItem === item.id
                    ? 'bg-primary-50 border-primary-300 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    item.difficulty === 'Obvious' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.category}
                  </div>
                  
                  {foundItems.includes(item.id) ? (
                    <CheckIcon className="w-5 h-5 text-success-500" />
                  ) : (
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">
                  {item.item}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {item.description}
                </p>

                {/* Hint */}
                {showHints && !foundItems.includes(item.id) && (
                  <div className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <QuestionMarkCircledIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-700">{item.hint}</span>
                  </div>
                )}

                {/* AI Type Badge */}
                {foundItems.includes(item.id) && (
                  <div className="mt-3 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    <LightningBoltIcon className="w-3 h-3 inline mr-1" />
                    {item.aiType}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* Selected Item Details */}
        <AnimatePresence>
          {selectedItem && selectedItemData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <LightningBoltIcon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{selectedItemData.item}</h4>
                  <div className="text-sm text-primary-600 font-medium">{selectedItemData.aiType}</div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>How it works:</strong> {selectedItemData.explanation}
              </p>

              {foundItems.includes(selectedItem) && (
                <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-success-700 font-medium text-sm">
                    <CheckIcon className="w-4 h-4" />
                    <span>Discovered! You're becoming an AI expert.</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Insight */}
        {foundItems.length > 0 && !gameCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-xl"
          >
            <h4 className="font-semibold text-primary-800 mb-2">
              💡 Learning Insight
            </h4>
            <p className="text-primary-700 text-sm">
              You've found {foundItems.length} AI systems! Notice how AI is integrated seamlessly into everyday experiences. 
              This is exactly what our full course teaches—practical AI understanding that applies to real life.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}