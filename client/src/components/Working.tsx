import {motion} from 'framer-motion'

const steps = [
  {
    title: "Create Your Account",
    desc: "Sign up and set up your financial dashboard.",
    img: "/images/signup.png",
  },
  {
    title: "Add Income & Expenses",
    desc: "Track all your financial activity in one place.",
    img: "/images/transactions.png",
  },
  {
    title: "Add Debts",
    desc: "Include loans and credit cards to monitor repayment.",
    img: "/images/debts.png",
  },
  {
    title: "Smart Debt Strategy",
    desc: "Get intelligent recommendations to minimize debt faster.",
    img: "/images/strategy.png",
  },
  {
    title: "Reach Financial Goals",
    desc: "Follow insights and become debt-free sooner.",
    img: "/images/goals.png",
  },
];

const Working = () => {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">

      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold samurai-font">How It Works</h2>
        <p className="text-gray-500 mt-4 cascadia">
          Take control of your finances in 5 simple steps
        </p>
      </div>

      <div className="space-y-24">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-2 gap-12 items-center ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={step.img}
                alt={step.title}
                className="rounded-xl shadow-lg"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
                  {idx + 1}
                </span>
              </div>

              <h3 className="text-2xl font-semibold mb-3 samurai-font">{step.title}</h3>

              <p className="text-gray-500 cascadia">{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Working;
