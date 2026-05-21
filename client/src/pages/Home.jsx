import { useEffect, useState } from 'react';
import api from '../api/axios';
import HeroSection from '../components/home/HeroSection';
import SearchSection from '../components/home/SearchSection';
import TopCompanies from '../components/home/TopCompanies';
import PopularQuestions from '../components/home/PopularQuestions';
import CodingPractice from '../components/home/CodingPractice';
import LearningRoadmap from '../components/home/LearningRoadmap';
import QuizSection from '../components/home/QuizSection';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/home')
      .then((res) => setData(res.data.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner-app" />
      </div>
    );
  }

  return (
  <>
    <HeroSection />
    <SearchSection />
    <QuizSection quizzes={data?.quizzes || []} />
    <TopCompanies companies={data?.companies || []} />
    <PopularQuestions questions={data?.popularQuestions || []} />
    <CodingPractice problems={data?.codingProblems || []} />
    <LearningRoadmap roadmap={data?.learningRoadmap || []} materials={data?.materials || []} />
  </>
  );
};

export default Home;
