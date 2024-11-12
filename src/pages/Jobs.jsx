import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getJobs } from '../lib/services/jobService';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const jobsData = await getJobs();
      setJobs(jobsData.filter(job => job.status === 'active'));
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Tous les postes' },
    { id: 'cdi', name: 'CDI' },
    { id: 'cdd', name: 'CDD' },
    { id: 'stage', name: 'Stage' },
    { id: 'alternance', name: 'Alternance' }
  ];

  const filteredJobs = selectedCategory === 'all' 
    ? jobs 
    : jobs.filter(job => job.type.toLowerCase() === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-700 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-emerald-300 font-medium tracking-wider text-sm">CARRIÈRES</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              Rejoignez notre équipe
            </h1>
            <p className="text-lg text-emerald-100 leading-relaxed">
              Donnez du sens à votre carrière en contribuant à des projets à fort impact social et environnemental
            </p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Liste des offres */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* En-tête de l'offre */}
                <div className="mb-5">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                    <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      {job.department}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</p>
                </div>

                {/* Missions principales */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Missions principales</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.split('\n').map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="whitespace-pre-line leading-relaxed">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Profil recherché */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Profil recherché</h3>
                  <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {job.requirements}
                  </div>
                </div>

                {/* Salaire */}
                {job.salary && (
                  <div className="mb-6 pb-4 border-b">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Salaire : </span>
                      {job.salary}
                    </p>
                  </div>
                )}

                {/* Bouton Postuler */}
                <div className="text-center pt-2">
                  <Link
                    to={`/offres/${job.id}/postuler`}
                    className="inline-block w-full sm:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
                  >
                    Postuler à cette offre
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <div className="bg-gray-50 rounded-xl p-6 max-w-xl mx-auto">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-gray-500 text-lg mb-2">Aucune offre disponible pour le moment</p>
                <p className="text-gray-400">Revenez bientôt pour découvrir nos futures opportunités</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-xl p-6 sm:p-8 text-center text-white">
            <h2 className="font-display text-2xl font-bold mb-4">
              Vous ne trouvez pas le poste idéal ?
            </h2>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
              Envoyez-nous une candidature spontanée ! Nous sommes toujours à la recherche 
              de talents passionnés qui partagent nos valeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-emerald-800 px-6 py-3 rounded-full text-lg font-medium hover:bg-emerald-100 transition-colors duration-300"
              >
                Candidature spontanée
                <span className="ml-2">→</span>
              </Link>
              <a
                href="mailto:recrutement@ecosolidaire.org"
                className="bg-emerald-800/30 backdrop-blur-md text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-emerald-800/40 transition-colors duration-300"
              >
                recrutement@ecosolidaire.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Jobs;