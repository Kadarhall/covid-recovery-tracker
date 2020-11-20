import axios from 'axios';
import moment from 'moment';

// https://github.com/NovelCOVID/API
export const getCountries = async () =>
  await axios.get('https://disease.sh/v3/covid-19/countries');

export const getGEOData = async () =>
  await axios.get('https://disease.sh/v3/covid-19/jhucsse');

export const getTotals = async () =>
  await axios.get('https://disease.sh/v3/covid-19/all');

export const getYesterdayTotals = async () =>
  await axios.get('https://disease.sh/v3/covid-19/all', {
    params: { yesterday: true },
  });

export const getHistory = async () =>
  await axios.get('https://disease.sh/v3/covid-19/historical/all', {
    params: { lastdays: 'all' },
  });

export const getUSStates = async () =>
  await axios.get('https://disease.sh/v3/covid-19/states');

// https://newsapi.org
export const getNews = async ({ page = 1 }) => {
  const sources = [
    'abc-news',
    'abc-news-au',
    'associated-press',
    'axios',
    'bbc-news',
    'bleacher-report',
    'bloomberg',
    'business-insider',
    'buzzfeed',
    'cbc-news',
    'cbs-news',
    'cnbc',
    'cnn',
    'entertainment-weekly',
    'espn',
    'fortune',
    'fox-news',
    'google-news',
    'nbc-news',
    'the-washington-post',
    'fox-sports',
    'hacker-news',
    'ign',
    'mashable',
    'msnbc',
    'mtv-news',
    'national-geographic',
    'new-scientist',
    'newsweek',
    'nfl-news',
    'reddit-r-all',
    'techcrunch',
    'talksport',
    'techradar',
    'the-american-conservative',
    'the-globe-and-mail',
    'the-hill',
    'the-huffington-post',
    'the-verge',
    'the-wall-street-journal',
    'the-washington-post',
    'the-washington-times',
    'time',
    'usa-today',
    'vice-news',
    'wired',
  ];

  return await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      apiKey: process.env.REACT_APP_NEWS_API_TOKEN,
      from: moment().format('YYYY-MM-DD'),
      page,
      pageSize: 12,
      q: 'COVID',
      sortBy: 'publishedAt',
      sources: sources.join(','),
    },
  });
};