import React, { useState } from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ModernCard from '../components/ModernCard.jsx';
import "../styles/modern-card.css";

const Press = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Introducing Alelken: A New Era of Mental Wellness Technology",
      excerpt: "Today marks a significant milestone in our journey to revolutionize mental wellness through thoughtful technology integration.",
      content: "We're excited to announce the official launch of Alelken, a comprehensive digital platform designed to enhance human wellbeing through innovative technology solutions...",
      category: "announcement",
      date: "2024-03-15",
      author: "HariKrishna",
      image: "/assets/images/blog/announcement.svg",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Science Behind Mindful Technology Design",
      excerpt: "Exploring how evidence-based design principles shape our approach to creating wellness-focused digital experiences.",
      content: "At Alelken, we believe that technology should enhance rather than overwhelm human potential. Our design philosophy is grounded in extensive research...",
      category: "insights",
      date: "2024-03-10",
      author: "Karthick B",
      image: "/assets/images/blog/insights.svg",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Building Community Through Digital Wellness Platforms",
      excerpt: "How our platform fosters genuine connections and meaningful growth-oriented community experiences.",
      content: "Community connection is at the heart of mental wellness. Our platform creates supportive spaces that spark genuine connection...",
      category: "community",
      date: "2024-03-05",
      author: "Karthick Selvaraj",
      image: "/assets/images/blog/community.svg",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Partnership Announcement: Expanding Mental Health Resources",
      excerpt: "We're thrilled to announce our strategic partnership with leading mental health organizations to broaden our impact.",
      content: "Today we're announcing a groundbreaking partnership that will significantly expand access to mental health resources...",
      category: "announcement",
      date: "2024-02-28",
      author: "HariKrishna",
      image: "/assets/images/blog/announcement.svg",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "The Future of Stress Management: AI-Powered Wellness Tools",
      excerpt: "Discover how artificial intelligence is transforming personalized stress management and emotional balance.",
      content: "The intersection of AI and mental wellness represents a paradigm shift in how we approach stress management...",
      category: "insights",
      date: "2024-02-20",
      author: "Karthick B",
      image: "/assets/images/blog/insights.svg",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "User Success Stories: Real Impact, Real Lives",
      excerpt: "Celebrating the transformative journeys of our community members and the positive changes they've experienced.",
      content: "Nothing motivates us more than hearing about the real-world impact our platform has on people's lives...",
      category: "community",
      date: "2024-02-15",
      author: "Karthick Selvaraj",
      image: "/assets/images/blog/community.svg",
      readTime: "5 min read"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'announcement', label: 'Announcements' },
    { id: 'insights', label: 'Insights' },
    { id: 'community', label: 'Community' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Header />
      
      <section className="page-header">
        <div className="container">
          <h1>Press & Insights</h1>
          <p>Stay updated with the latest news, insights, and developments from Alelken as we continue to innovate in the mental wellness technology space.</p>
        </div>
      </section>

      <section className="press-content brand-section animated-fade-in">
        <div className="container">
          {/* Category Filter */}
          <div className="press-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="press-grid">
            {filteredPosts.map((post, index) => (
              <ModernCard
                key={post.id}
                className={`blog-card animated-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                image={{ 
                  src: post.image, 
                  alt: post.title,
                  width: "100%",
                  height: "200px"
                }}
                variant="elevated"
                hoverEffect="lift"
              >
                <div className="blog-meta">
                  <span className={`category-tag ${post.category}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <span className="read-time">{post.readTime}</span>
                </div>
                
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                
                <div className="blog-footer">
                  <div className="author-info">
                    <span className="author">By {post.author}</span>
                    <span className="date">{formatDate(post.date)}</span>
                  </div>
                  <button className="read-more-btn">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </ModernCard>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="no-posts">
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;