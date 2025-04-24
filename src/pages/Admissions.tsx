import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useNavigate, Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Application form schema for all steps
const applicationSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  
  // Step 2: Education Details
  educationLevel: z.string().min(1, { message: "Education level is required" }),
  previousInstitution: z.string().optional(),
  gradeOrCgpa: z.string().optional(),
  yearOfCompletion: z.string().optional(),
  
  // Step 3: Program Selection
  program: z.string().min(1, { message: "Program is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  
  // Step 4: Additional Information
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  howDidYouHear: z.string().optional(),
  specialNeeds: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const Admissions = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      educationLevel: '',
      previousInstitution: '',
      gradeOrCgpa: '',
      yearOfCompletion: '',
      program: '',
      semester: '',
      address: '',
      emergencyContact: '',
      howDidYouHear: '',
      specialNeeds: '',
      agreeToTerms: false,
    },
  });

  const handleApplicationSubmit = async (values: ApplicationFormValues) => {
    try {
      // Modified: Added random UUID for user_id since we're not requiring login
      const { data, error } = await supabase.from('admissions').insert({
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        program: values.program,
        education_level: values.educationLevel,
        previous_institution: values.previousInstitution,
        grade_or_cgpa: values.gradeOrCgpa ? parseFloat(values.gradeOrCgpa) : null,
        user_id: crypto.randomUUID() // Generate a random UUID for guest submissions
      });

      if (error) {
        toast.error('Application submission failed', {
          description: error.message
        });
      } else {
        setSubmitted(true);
        toast.success('Application submitted successfully', {
          description: 'Your application has been received. We will contact you soon.'
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong', {
        description: 'Please try again later.'
      });
    }
  };

  const nextStep = () => {
    const fieldsToValidate = {
      1: ['fullName', 'email', 'phone', 'dateOfBirth', 'gender', 'nationality'],
      2: ['educationLevel'],
      3: ['program', 'semester'],
    }[currentStep as 1 | 2 | 3];

    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) setCurrentStep(currentStep + 1);
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8 w-full max-w-md mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === currentStep 
                  ? 'bg-niet-blue text-white' 
                  : step < currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
            <div className="text-xs mt-1 text-center">
              {step === 1 && 'Personal'}
              {step === 2 && 'Education'}
              {step === 3 && 'Program'}
              {step === 4 && 'Submit'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (234) 567-8900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="PreferNotToSay">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bangladeshi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Education Details</h2>
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousInstitution"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Previous Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of your previous school/college/university" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="gradeOrCgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade/CGPA</FormLabel>
                    <FormControl>
                      <Input placeholder="3.5" type="number" step="0.01" min="0" max="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearOfCompletion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Completion</FormLabel>
                    <FormControl>
                      <Input placeholder="2023" type="number" min="1900" max="2099" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Program Selection</h2>
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Program</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science & Engineering</SelectItem>
                      <SelectItem value="Electrical Engineering">Electrical & Electronic Engineering</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                      <SelectItem value="Business Administration">Business Administration</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Preferred Semester</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                      <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                      <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                      <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your permanent address" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Name and phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="howDidYouHear"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>How did you hear about us?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Friend/Family">Friend or Family</SelectItem>
                      <SelectItem value="School Counselor">School Counselor</SelectItem>
                      <SelectItem value="Education Fair">Education Fair</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialNeeds"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Any special needs or requirements?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please specify if you have any special requirements" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This information will be used to ensure we can accommodate your needs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4 pt-2 border-t">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the <Link to="/terms" className="text-niet-blue hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-niet-blue hover:underline">privacy policy</Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </>
        );

      default:
        return null;
    }
  };
  
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-niet-navy/20 p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="mx-auto my-4 bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold">Application Submitted!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Thank you for submitting your application to NIET. We have received your information.</p>
              <p className="mb-6">Our admissions team will review your application and contact you soon. You will receive an email confirmation shortly.</p>
              <Button onClick={() => navigate('/')} className="bg-niet-blue hover:bg-niet-blue/90">
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-niet-navy/20 p-4 pt-24">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Admission Application</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepIndicator()}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleApplicationSubmit)} className="space-y-4">
                {renderFormStep()}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="ml-auto"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="ml-auto bg-niet-blue hover:bg-niet-blue/90"
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-sm text-center text-muted-foreground border-t pt-4">
            Need assistance? Contact our admissions office at <a href="mailto:admissions@niet.edu.bd" className="text-niet-blue hover:underline">admissions@niet.edu.bd</a> or call <a href="tel:+8801234567890" className="text-niet-blue hover:underline">+880 1234 567890</a>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Admissions;
