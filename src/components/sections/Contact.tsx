'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useActionState } from 'react';
import { sendMessage, ContactState } from '@/actions/sendMessage';

interface ContactProps {
    email: string;
    phone: string;
    location: string;
}

const initialState: ContactState = {
    success: false,
    error: null,
    validationErrors: {},
};

export function Contact({ email, phone, location }: ContactProps) {
    const [state, formAction, isPending] = useActionState(sendMessage, initialState);

    return (
        <section id="contact" className="py-20 bg-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-primary pl-4">
                            Get in Touch
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-md">
                            I am currently looking for internships and entry-level opportunities in Cybersecurity and SOC roles.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Email</div>
                                    <a href={`mailto:${email}`} className="text-white hover:text-primary transition-colors">
                                        {email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Phone</div>
                                    <div className="text-white">{phone}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Location</div>
                                    <div className="text-white">{location}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl"
                    >
                        <form action={formAction} className="space-y-6">
                            {state.error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">{state.error}</p>
                                </div>
                            )}

                            {state.success && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">Message sent successfully! I'll get back to you soon.</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    disabled={state.success}
                                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                                    placeholder="John Doe"
                                />
                                {state.validationErrors?.name && (
                                    <p className="mt-1 text-sm text-red-400">{state.validationErrors.name[0]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    disabled={state.success}
                                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                                    placeholder="john@example.com"
                                />
                                {state.validationErrors?.email && (
                                    <p className="mt-1 text-sm text-red-400">{state.validationErrors.email[0]}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    disabled={state.success}
                                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none disabled:opacity-50"
                                    placeholder="Hello, I'd like to discuss an opportunity..."
                                />
                                {state.validationErrors?.message && (
                                    <p className="mt-1 text-sm text-red-400">{state.validationErrors.message[0]}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || state.success}
                                className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    'Sending...'
                                ) : state.success ? (
                                    <>Sent <CheckCircle className="w-4 h-4" /></>
                                ) : (
                                    <>Send Message <Send className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
