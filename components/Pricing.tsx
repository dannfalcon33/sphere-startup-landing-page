import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// --- Payment Modal Component & Helpers ---

// SVG Icons for payment methods
const PayPalIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto" fill="#0070BA">
        <path d="M7.076 21.337H2.478l-.124-.76-1.63-10.422c-.14-.88.455-1.684 1.34-1.824l.09-.014.09-.014c.88-.14 1.684.455 1.824 1.34l.793 5.06-1.07-6.833c-.14-.88.455-1.684 1.34-1.824l.09-.014.09-.014c.88-.14 1.684.455 1.824 1.34l.794 5.06L9.4 6.327c-.14-.88.455-1.684 1.34-1.824l.09-.014.09-.014c.88-.14 1.684.455 1.824 1.34l2.507 15.908-.123-.759-1.63-10.422c-.14-.88.455-1.684 1.34-1.824l.09-.014.09-.014c.88-.14 1.684.455 1.824 1.34l.794 5.06-1.07-6.833c-.14-.88.455-1.684 1.34-1.824l.09-.014.09-.014c.88-.14 1.684.455 1.824 1.34l.794 5.06L21.36 2.663c.14-.88.945-1.478 1.824-1.34.88.14 1.478.945 1.34 1.824L19.4 18.21c-.138.878-.94 1.476-1.82 1.34-.877-.138-1.476-.94-1.34-1.82l2.36-14.97-1.63 10.423-.123.759h-4.29l2.42-15.35-1.63 10.423-.123.759h-4.29l2.42-15.35-1.63 10.423-.123.759H7.076z"/>
    </svg>
);
const VisaIcon = () => (
    <svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto" fill="#1434CB">
        <path d="M22.4.2H18.1L12.9 8H16l5.4-7.8h.9V8h2.5V.2zM0 .2v7.8h2.5V4.3a1.7 1.7 0 011.8-2c.8 0 1.3.3 1.3.3L6 4.3a.8.8 0 00-.8-.5c-.4 0-.7.3-.7.8v3.4h2.5V.2H5.3L3.8 5 2.3.2H0zM12.2 2.7c0-1.2-.7-1.7-1.7-1.7-.6 0-1.1.3-1.4.5l.5 1.7c.2-.1.5-.2.7-.2.3 0 .5.1.5.4s-.2.4-.6.6l-1 .3C7.6 4.5 7 5 7 6c0 1.2.8 1.8 1.9 1.8.8 0 1.3-.3 1.6-.5l-.5-1.7c-.2.2-.5.3-.8.3-.3 0-.5-.2-.5-.5s.2-.4.6-.6l1-.3c1.6-.6 2.1-1.3 2.1-2.3z" />
    </svg>
);
const MastercardIcon = () => (
    <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" className="w-12 h-auto">
        <circle cx="15" cy="12" r="7" fill="#EA001B" />
        <circle cx="23" cy="12" r="7" fill="#F79E1B" />
        <path d="M20 12a7 7 0 01-5 6.7V5.3a7 7 0 015 6.7z" fill="#FF5F00" />
    </svg>
);
const BitcoinIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-auto" fill="#F7931A">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.08 17.22h-2.37v2.37H6.18v-2.37H3.81V4.41h9.1c3.81 0 5.25 1.9 5.25 4.65 0 2.22-1.12 3.84-2.85 4.38l3.3 3.78h-2.94l-3.03-3.63H8.55v2.64zm0-6.12h3.24c2.1 0 3.12-1.29 3.12-3.06 0-1.8-1.02-2.91-3.12-2.91H8.55v5.97z"/>
    </svg>
);

interface ModalPlan {
    name: string;
    monthlyPrice: number;
    annualPrice: number;
}

interface PaymentModalProps {
    plan: ModalPlan;
    billingCycle: 'monthly' | 'annually';
    onClose: () => void;
}

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
};

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, billingCycle, onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState<string>('Visa');
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [formErrors, setFormErrors] = useState({ fullName: false, email: false });

    const price = billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12);
    const total = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (value.trim() !== '') {
            setFormErrors(prev => ({ ...prev, [id]: false }));
        }
    };
    
    const handleProceed = () => {
        const newErrors = {
            fullName: formData.fullName.trim() === '',
            email: formData.email.trim() === '',
        };
        setFormErrors(newErrors);

        if (!newErrors.fullName && !newErrors.email) {
            setStep(2);
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step === 1) {
            handleProceed();
            return;
        }

        console.log('Form submitted', { plan: plan.name, billingCycle, total, paymentMethod: selectedMethod, ...formData });
        alert(`Thank you for your purchase! (This is a demo for ${selectedMethod} payment)`);
        onClose();
    };

    const stepVariants: Variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    const inputClass = (hasError: boolean) => 
        `block w-full px-3 py-2 rounded-md bg-gray-900/50 border text-white focus:ring-purple-500 focus:border-purple-500 transition ${hasError ? 'border-red-500' : 'border-white/10'}`;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <motion.div
                className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl shadow-purple-900/20"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold logo text-white mb-2">Payment Details</h2>
                        <p className="text-gray-400 mb-8">Secure your plan and get started.</p>

                        <form onSubmit={handleFormSubmit} className="flex flex-col h-full min-h-[400px]">
                          <div className="flex-grow">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                                <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} required className={inputClass(formErrors.fullName)} />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                                <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className={inputClass(formErrors.email)} />
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-sm font-medium text-gray-300 mb-2">Payment Method</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {['PayPal', 'Visa', 'Mastercard', 'Bitcoin'].map(method => (
                                                    <button type="button" key={method} onClick={() => setSelectedMethod(method)} className={`flex items-center justify-center p-3 rounded-md border-2 transition-colors h-16 ${selectedMethod === method ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 bg-gray-900/50 hover:border-gray-500'}`}>
                                                        {method === 'PayPal' && <PayPalIcon />}
                                                        {method === 'Visa' && <VisaIcon />}
                                                        {method === 'Mastercard' && <MastercardIcon />}
                                                        {method === 'Bitcoin' && <BitcoinIcon />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col h-full"
                                    >
                                        <button type="button" onClick={() => setStep(1)} className="flex items-center text-sm text-gray-400 hover:text-white mb-6">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                            Back to details
                                        </button>
                                        
                                        {(selectedMethod === 'Visa' || selectedMethod === 'Mastercard') && (
                                          <div>
                                              <h3 className="font-semibold mb-4 text-white">Pay with Card via Stripe</h3>
                                              <div className="space-y-3">
                                                <input placeholder="Card Number" className={inputClass(false)} required />
                                                <div className="grid grid-cols-2 gap-3">
                                                  <input placeholder="MM / YY" className={inputClass(false)} required />
                                                  <input placeholder="CVC" className={inputClass(false)} required />
                                                </div>
                                              </div>
                                          </div>
                                        )}
                                        {selectedMethod === 'PayPal' && (
                                            <div className="text-center">
                                                <h3 className="font-semibold mb-4 text-white">Continue with PayPal</h3>
                                                <button type="submit" className="w-full py-3 bg-[#0070BA] text-white font-bold rounded-lg hover:bg-[#005ea6] transition-colors">Pay with PayPal</button>
                                            </div>
                                        )}
                                        {selectedMethod === 'Bitcoin' && (
                                          <div className="text-center">
                                            <h3 className="font-semibold mb-2 text-white">Pay with Bitcoin</h3>
                                            <p className="text-xs text-gray-400 mb-4">Send ${total} in BTC to the address below.</p>
                                            <div className="bg-white p-2 rounded-lg inline-block">
                                              <svg className="w-24 h-24" viewBox="0 0 100 100"><path fill="#ccc" d="M0 0h100v100H0z" /><path fill="#fff" d="M10 10h80v80H10z" /><path fill="#000" d="M20,20h20v20h-20z M60,20h20v20h-20z M20,60h20v20h-20z M30,40h10v10h-10z M50,50h10v10h-10z M70,70h10v10h-10z" /></svg>
                                            </div>
                                            <p className="text-sm font-mono break-all bg-gray-900/50 p-2 rounded-md mt-4 text-gray-300">3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy</p>
                                          </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                           
                           <div className="mt-auto pt-8">
                                {step === 1 ? (
                                    <button type="button" onClick={handleProceed} className="w-full py-3 px-6 text-base font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                                        Proceed to Payment
                                    </button>
                                ) : (
                                    <button type="submit" className="w-full py-3 px-6 text-base font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                                        Pay ${total}
                                    </button>
                                )}
                           </div>
                        </form>
                    </div>

                    <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                        
                        <div className="space-y-4 text-gray-300 flex-grow">
                            <div className="flex justify-between">
                                <span>Plan</span>
                                <span className="font-semibold text-white">{plan.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Billing Cycle</span>
                                <span className="font-semibold text-white capitalize">{billingCycle}</span>
                            </div>

                            <hr className="border-gray-700 my-4" />

                            <div className="flex justify-between items-baseline">
                                <span className="text-lg">Amount</span>
                                <span className="text-2xl font-bold text-white">${price}<span className="text-sm font-normal text-gray-400">/mo</span></span>
                            </div>
                             {billingCycle === 'annually' && (
                                <p className="text-xs text-right text-gray-400">Billed as one payment of ${plan.annualPrice}</p>
                            )}
                        </div>
                        
                        <div className="mt-6 border-t border-gray-700 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-white">Total Due Today</span>
                                <span className="text-3xl font-extrabold text-purple-400">${total}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

// --- Main Pricing Component ---

const CheckIcon = () => (
    <svg className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular: boolean;
}

const pricingPlans: Plan[] = [
  {
    name: 'Basic',
    description: 'Ideal for creators and small businesses exploring AI capabilities.',
    monthlyPrice: 49,
    annualPrice: 470, 
    features: [
      '1 Basic AI Avatar',
      'Up to 5 AI-generated videos/mo',
      'Standard AI development support',
      'Email & Community support',
    ],
    popular: false,
  },
  {
    name: 'Standard',
    description: 'The perfect package for brands scaling their digital presence.',
    monthlyPrice: 149,
    annualPrice: 1430, 
    features: [
      'Everything in Basic, plus:',
      'Up to 3 Custom AI Avatars',
      'Up to 20 AI videos/mo with branding',
      'Dedicated AI Model for 1 Influencer',
      'Priority chat & email support',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    description: 'Comprehensive AI solutions for enterprises and agencies.',
    monthlyPrice: 399,
    annualPrice: 3830,
    features: [
      'Everything in Standard, plus:',
      'Unlimited Advanced AI Avatars',
      'Unlimited 4K AI video generation',
      'Bespoke AI Influencer Model creation',
      'Dedicated Account Manager & 24/7 Support',
    ],
    popular: false,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleChoosePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <section id="pricing" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight logo uppercase">
              Flexible <span className="text-purple-400">Pricing</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Choose the perfect plan to assist your software projects. Scale as you grow.
            </p>
          </motion.div>

          {/* Billing Cycle Toggle */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex justify-center items-center space-x-4"
          >
            <span className={`font-medium transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <div 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${billingCycle === 'annually' ? 'bg-purple-600 justify-end' : 'bg-gray-700 justify-start'}`}
            >
              <motion.div 
                layout 
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                className={`w-6 h-6 bg-white rounded-full shadow-md`}
              />
            </div>
            <span className={`font-medium transition-colors ${billingCycle === 'annually' ? 'text-white' : 'text-gray-500'}`}>
              Annually <span className="text-sm text-purple-400">(Save 20%)</span>
            </span>
          </motion.div>

          {/* Pricing Plans Grid */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className={`relative flex flex-col p-8 bg-gray-900/40 border rounded-2xl ${plan.popular ? 'border-purple-500' : 'border-white/10'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase bg-purple-600 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white text-center">{plan.name}</h3>
                  <p className="mt-4 text-sm text-gray-400 text-center">{plan.description}</p>
                  
                  <div className="mt-8 text-center">
                    <span className="text-5xl font-extrabold text-white">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                    </span>
                    <span className="text-lg font-medium text-gray-400">/mo</span>
                    {billingCycle === 'annually' && (
                      <p className="text-xs text-gray-500 mt-1">Billed annually at ${plan.annualPrice}</p>
                    )}
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-300">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-10">
                  <button onClick={() => handleChoosePlan(plan)} className={`w-full py-3 px-6 text-base font-semibold rounded-lg transition-all duration-300 ${plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>
                    Choose Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Payment Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            billingCycle={billingCycle}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Pricing;