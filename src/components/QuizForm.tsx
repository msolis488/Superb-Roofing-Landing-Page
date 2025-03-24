import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface QuizFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ContactFormData) => void;
}

type Question = {
  id: number;
  text: string;
  options: { value: string; label: string }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "Are you currently a homeowner?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: 2,
    text: "How old is your roof?",
    options: [
      { value: "0-5", label: "0-5 years" },
      { value: "6-10", label: "6-10 years" },
      { value: "11-15", label: "11-15 years" },
      { value: "15+", label: "15+ years" },
    ],
  },
  {
    id: 3,
    text: "Have you noticed any leaks or damage?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not Sure" },
    ],
  },
  {
    id: 4,
    text: "When would you like to start the project?",
    options: [
      { value: "immediate", label: "As soon as possible" },
      { value: "1-3months", label: "1-3 months" },
      { value: "3-6months", label: "3-6 months" },
      { value: "planning", label: "Just planning" },
    ],
  },
  {
    id: 5,
    text: "Do you live in or near the New Braunfels area?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

export default function QuizForm({
  open = true,
  onOpenChange,
  onSubmit,
}: QuizFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showContactForm, setShowContactForm] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });

    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Check qualification - must be homeowner and in New Braunfels area
      if (newAnswers[1] === "yes" && answer === "yes") {
        setShowContactForm(true);
      } else {
        onOpenChange?.(false);
        // You might want to show a message about not qualifying
      }
    }
  };

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const webhookData = {
        data: {
          ...data,
          quizAnswers: answers,
        },
        timestamp: new Date().toISOString(),
        source: "landing-page",
      };

      const response = await fetch(
        "https://lovemarketing.app.n8n.cloud/webhook-test/landing-page-deal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.status}`);
      }

      onSubmit?.(data);
      form.reset();
      setShowContactForm(false);
      onOpenChange?.(false);
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            {showContactForm
              ? "Congratulations, You Qualify For $1000 Cash With Your Roof Replacement!"
              : "See If You Qualify"}
          </DialogTitle>
        </DialogHeader>

        {!showContactForm ? (
          <div className="py-6">
            <h3 className="text-lg font-semibold mb-4">
              {questions[currentQuestion].text}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full text-left justify-start h-auto py-4 text-lg"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(555) 555-5555"
                        {...field}
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, City, State"
                        {...field}
                        className="bg-gray-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about your roof</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full min-h-[100px] p-3 rounded-md border bg-gray-50"
                        placeholder="Please describe any specific issues or concerns about your roof..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="w-full max-w-sm bg-blue-900 hover:bg-blue-800 text-white"
                  size="lg"
                >
                  Get My Quote
                </Button>
              </div>
            </form>
          </Form>
        )}

        <div className="text-center text-sm text-gray-500 mt-4">
          By continuing, you agree to be contacted about roofing services.
        </div>
      </DialogContent>
    </Dialog>
  );
}
