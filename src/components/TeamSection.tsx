import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
  expertise?: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Danilo Kuss",
      role: "CEO & CTO",
      description: "Visionary leader with deep expertise in RF-AI & Embedded Systems. Spearheading HAVENIS's innovation in contactless vital sensing technology.",
      image: "/images/danilo-kuss.jpg",
      expertise: "RF-KI & Embedded Systems"
    },
    {
      name: "Team Member 2",
      role: "Co-Founder",
      description: "Expert in healthcare technology and market expansion.",
      expertise: "Healthcare & Product Strategy"
    },
    {
      name: "Team Member 3",
      role: "Lead Engineer",
      description: "Specialized in AI signal processing and embedded systems development.",
      expertise: "AI & Signal Processing"
    }
  ];

  return (
    <section id="team" className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Exceptional talent driving the future of ethical AI sensing. Leading experts in RF-AI, embedded systems, and health tech innovation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-lg transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  )}
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4">{member.description}</p>

                {member.expertise && (
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Expertise</p>
                    <p className="text-cyan-300 text-sm font-medium">{member.expertise}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Join our growing team of innovators pushing the boundaries of AI sensing technology.
          </p>
          <a
            href="mailto:careers@havenis.ai"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Join Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
