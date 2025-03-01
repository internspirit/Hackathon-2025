import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { useTheme } from "@/context/ThemeContext"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { FiTwitter, FiInstagram, FiCalendar } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function SentimentTrends() {
  const [platform, setPlatform] = useState('all')
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date()
  ])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { darkMode } = useTheme()

  // State for sentiment calculation fetched from the backend
  const [sentimentCalc, setSentimentCalc] = useState(null)
  // State for trending hashtags fetched from the backend
  const [trendingHashtags, setTrendingHashtags] = useState([])

  const [startDate, endDate] = dateRange

  const timeframeOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
  ]

  const sentimentOptions = [
    { value: 'all', label: 'All' },
    { value: 'positive', label: 'Positive' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'negative', label: 'Negative' },
  ]

  // Fetch sentiment calculation when platform changes
  useEffect(() => {
    async function fetchSentimentCalc() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/calculate-sentiment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brand_name: "boAt", platform })
        })
        const data = await response.json()
        console.log("Sentiment Calculation:", data)
        setSentimentCalc(data)
      } catch (error) {
        console.error("Error fetching sentiment calculation:", error)
      }
    }
    fetchSentimentCalc()
  }, [platform])

  // Fetch trending hashtags from backend
  useEffect(() => {
    async function fetchTrendingHashtags() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get_hashtag_sentiments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brand_name: "boAt" })
        })
        const data = await response.json()
        console.log('Fetched trending hashtags:', data)
        setTrendingHashtags(data)
      } catch (error) {
        console.error('Error fetching trending hashtags:', error)
      }
    }
    fetchTrendingHashtags()
  }, [])

  // Filter trending hashtags based on sentimentFilter
  const [sentimentFilterValue, setSentimentFilterValue] = useState('all')
  const filteredHashtags = trendingHashtags.filter(
    tag => sentimentFilterValue === 'all' || String(tag.sentiment).toLowerCase() === sentimentFilterValue
  )

  // Sample data for sentiment trends graph
  const trendData = {
    labels: Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Positive',
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 30) + 50),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Neutral',
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 15),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Negative',
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 15) + 5),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const trendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          color: '#6B7280',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage',
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          callback: function (value) {
            return value + '%'
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  }

  // Define sentimentMetrics sample data
  const sentimentMetrics = [
    {
      title: 'Average Sentiment Score',
      value: sentimentCalc.avg_sentiment_score.toFixed(2),
      change: '+5%',
      trend: 'up',
      description: 'Overall sentiment has improved over the selected period.'
    },
    {
      title: 'Sentiment Volatility',
      value: sentimentCalc.volatility_level,
      change: '-2%',
      trend: 'down',
      description: 'Sentiment stability has improved slightly.'
    },
    {
      title: 'Negative Mention Rate',
      value: sentimentCalc.neg_pos_ratio.toFixed(2) * 100,
      change: '-3.1%',
      trend: 'down',
      description: 'Negative mentions have decreased significantly.'
    },
    {
      title: 'Positive to Negative Ratio',
      value: sentimentCalc.pos_neg_ratio.toFixed(2) + ':1',
      change: '+0.8',
      trend: 'up',
      description: 'The ratio of positive to negative mentions has improved.'
    },
  ]

  return (
    <div className={`flex h-full overflow-y-scroll w-full ${darkMode ? 'dark bg-slate-900' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col space-y-6 overflow-hidden bg-background-light dark:bg-background-dark">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="space-y-6 mx-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sentiment Trends</h1>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setPlatform('all')}
                  className={`px-3 py-2 rounded-md text-sm ${platform === 'all'
                    ? 'bg-primary-light text-white bg-red-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                  All Platforms
                </button>
                <button
                  onClick={() => setPlatform('twitter')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${platform === 'twitter'
                    ? 'bg-primary-light text-white bg-blue-500'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                  <FiTwitter className="mr-2" /> Twitter
                </button>
                <button
                  onClick={() => setPlatform('instagram')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${platform === 'instagram'
                    ? 'bg-primary-light text-white bg-pink-600'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                >
                  <FiInstagram className="mr-2" /> Instagram
                </button>
              </div>
            </div>
          </div>

          {/* Trend Graph */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sentimentMetrics.map((metric, index) => (
              <div key={index} className="card shadow-lg rounded-3xl p-4 dark:bg-gray-800">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{metric.title}</h3>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                  <div className={`flex items-center text-sm font-medium dark:text-white ${metric.trend === 'up' ? 'text-positive' : 'text-negative'}`}>
                    {metric.change}
                    <svg
                      className={`ml-1 h-4 w-4 ${metric.trend === 'down' && 'transform rotate-180'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Key Insights */}
          <div className="card shadow-lg rounded-3xl p-4 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-md">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Positive Trend</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Sentiment has shown consistent improvement over the past 2 weeks, with positive mentions increasing by 12%.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Area to Monitor</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Product performance discussions show mixed sentiment. Consider addressing common concerns in upcoming updates.
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Recommendation</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Highlight positive customer experiences in marketing materials to reinforce brand reputation.
                </p>
              </div>
            </div>
          </div>

          {/* Sentiment Calculation */}
          {sentimentCalc && (
            <div className="card shadow-lg rounded-3xl p-4 dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sentiment Calculation</h2>
              <div className="flex flex-col space-y-2">
                <div>Volatility Level: <span className="font-bold">{sentimentCalc.volatility_level}</span></div>
                <div>Positive/Negative Ratio: <span className="font-bold">{sentimentCalc.pos_neg_ratio}</span></div>
                <div>Negative/Positive Ratio: <span className="font-bold">{sentimentCalc.neg_pos_ratio}</span></div>
                <div>Average Sentiment Score: <span className="font-bold">{sentimentCalc.avg_sentiment_score}</span></div>
              </div>
            </div>
          )}

          {/* Trending Hashtags & Phrases */}
          <div className="card shadow-lg rounded-3xl p-4 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trending Hashtags & Phrases</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                {sentimentOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSentimentFilterValue(option.value)}
                    className={`px-3 py-1 text-xs rounded-full ${sentimentFilterValue === option.value
                      ? 'bg-primary-light text-white bg-blue-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 h-64 flex flex-wrap items-center justify-center overflow-y-scroll overflow-x-visible">
              {filteredHashtags.map((tag, index) => (
                <div
                  key={index}
                  className={`m-1 px-3 py-1 rounded-full text-white ${String(tag.sentiment).toLowerCase() === 'positive' ? 'bg-green-400' :
                    String(tag.sentiment).toLowerCase() === 'neutral' ? 'bg-orange-400' : 'bg-red-500'
                    }`}
                  style={{ fontSize: `${Math.max(0.7, (tag.value || 10) / 10)}rem` }}
                >
                  #{tag.hashtag}
                </div>
              ))}
              {filteredHashtags.length === 0 && (
                <div className="text-sm text-gray-500 dark:text-gray-400">No trending hashtags available.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SentimentTrends
