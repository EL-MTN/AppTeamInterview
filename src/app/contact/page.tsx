'use client';

import Hero from '@/components/Hero';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', formData);
		alert('Thank you for your message! We will get back to you soon.');
		setFormData({
			name: '',
			email: '',
			subject: '',
			message: ''
		});
	};

	return (
		<div>
			<Hero title="Contact Us" blurb="We'd love to hear from you" />
			
			<div className="py-24 px-16">
				<div className="container mx-auto">
					<div className="grid grid-cols-2 gap-16">
						{/* Contact Form */}
						<div>
							<h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
							<p className="text-gray-600 mb-8">
								Have a question about plant care? Need help choosing the perfect plant? 
								Or just want to say hello? Drop us a message and we&apos;ll get back to you within 24 hours.
							</p>
							
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Your Name
										</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
											placeholder="John Doe"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Email Address
										</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
											placeholder="john@example.com"
										/>
									</div>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Subject
									</label>
									<select
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
									>
										<option value="">Select a subject</option>
										<option value="general">General Inquiry</option>
										<option value="order">Order Support</option>
										<option value="care">Plant Care Help</option>
										<option value="wholesale">Wholesale Inquiry</option>
										<option value="other">Other</option>
									</select>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Message
									</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows={6}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
										placeholder="Tell us how we can help..."
									/>
								</div>
								
								<button
									type="submit"
									className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2"
								>
									Send Message
									<Send className="w-5 h-5" />
								</button>
							</form>
						</div>
						
						{/* Contact Information */}
						<div>
							<h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>
							<p className="text-gray-600 mb-8">
								Come visit our greenhouse and explore our full collection of plants. 
								Our experts are always here to help you find the perfect green companion.
							</p>
							
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<MapPin className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Address</h3>
										<p className="text-gray-600">
											123 Garden Street<br />
											Greenville, CA 94102<br />
											United States
										</p>
									</div>
								</div>
								
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<Phone className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Phone</h3>
										<p className="text-gray-600">
											+1 (555) 123-4567<br />
											+1 (555) 987-6543 (Wholesale)
										</p>
									</div>
								</div>
								
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<Mail className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Email</h3>
										<p className="text-gray-600">
											hello@greenthumb.com<br />
											support@greenthumb.com
										</p>
									</div>
								</div>
								
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<Clock className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Store Hours</h3>
										<p className="text-gray-600">
											Monday - Friday: 9:00 AM - 7:00 PM<br />
											Saturday: 10:00 AM - 6:00 PM<br />
											Sunday: 11:00 AM - 5:00 PM
										</p>
									</div>
								</div>
							</div>
							
							{/* Map Placeholder */}
							<div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
								<div className="text-center">
									<MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
									<p className="text-gray-500">Interactive map would go here</p>
								</div>
							</div>
						</div>
					</div>
					
					{/* FAQ Section */}
					<div className="mt-24 pt-24 border-t border-gray-200">
						<h2 className="text-4xl font-bold text-center mb-12">
							Frequently Asked <span className="text-primary">Questions</span>
						</h2>
						<div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
							<div>
								<h3 className="font-semibold mb-2">Do you offer plant care consultations?</h3>
								<p className="text-gray-600">
									Yes! Our plant experts offer free 15-minute consultations to help you choose 
									the right plants and provide care tips.
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">What&apos;s your return policy?</h3>
								<p className="text-gray-600">
									We offer a 30-day health guarantee on all plants. If your plant isn&apos;t thriving, 
									we&apos;ll replace it or provide a full refund.
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Do you ship nationwide?</h3>
								<p className="text-gray-600">
									We ship to all 50 states! Orders over $50 qualify for free shipping, 
									and we ensure all plants are carefully packaged.
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Can I schedule a delivery?</h3>
								<p className="text-gray-600">
									Absolutely! You can choose your preferred delivery date at checkout, 
									and we&apos;ll make sure your plants arrive when you&apos;re ready.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}