import { motion } from "framer-motion";

const education = [
  {
    title: "Bachelor of Engineering (Computer Science)",
    place: "AMIE — Institute of Engineers (IEI), Kolkata",
    year: "2023",
    score: "72.27%",
  },
  {
    title: "Diploma in Mechanical Engineering",
    place: "TRR College of Technology",
    year: "2016",
    score: "76.6%",
  },
  {
    title: "SSC",
    place: "ZPHS, Neredmet",
    year: "2013",
    score: "8.8 GPA",
  },
  {
    title: "Python Full Stack Developer Certification",
    place: "Byte Academy",
    year: "Professional Certification",
  },
  {
    title: "Advanced CAD Certification",
    place: "NSIC, ECIL",
    year: "Professional Certification",
  },
];

export default function EducationSection() {
  return (
    <motion.section
      id="education"
      className="min-h-screen w-full bg-black text-white px-6 md:px-16 py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
        Education<span className="text-[#00E5FF]">.</span>
      </h2>
      <p className="text-gray-400 mb-14 text-base md:text-lg">
        Learning foundation — structured, wide, and evolving.
      </p>

      <div className="relative border-l border-gray-700 ml-4 md:ml-6">
        {education.map((item, index) => (
          <motion.div
            key={index}
            className="mb-12 ml-6 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <div className="absolute -left-[31px] w-4 h-4 md:w-5 md:h-5 bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]" />

            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
              <p className="text-[#00E5FF] text-sm md:text-base">{item.place}</p>
              <span className="text-gray-400 text-xs md:text-sm">
                {item.year} {item.score && `• ${item.score}`}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
