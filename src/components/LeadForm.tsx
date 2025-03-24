import React from "react";
import { submitLeadForm } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: FormData) => void;
}

export default function LeadForm({
  open = true,
  onOpenChange,
  onSubmit,
}: LeadFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSubmit = async (data: FormData) => {
    console.log(
      "%c[Form] Starting form submission...",
      "color: purple; font-weight: bold",
    );
    try {
      console.log("%c[Form] Form data:", "color: purple", data);
      console.log("%c[Form] Calling submitLeadForm...", "color: purple");
      const result = await submitLeadForm(data);
      console.log(
        "%c[Form] Form submitted successfully:",
        "color: green",
        result,
      );
      onSubmit?.(data);
      form.reset();
      setShowSuccess(true);
    } catch (error) {
      console.error("%c[Form] Form submission failed:", "color: red", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px] bg-white"
        aria-describedby="lead-form-description"
      >
        <div id="lead-form-description" className="sr-only">
          Form to request a roofing quote and claim your $1,000 discount
        </div>
        {showSuccess ? (
          <div className="py-8 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6">
              We'll be in touch with your quote shortly.
            </p>
            <Button
              onClick={() => {
                setShowSuccess(false);
                onOpenChange?.(false);
              }}
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-gray-900">
                Get Your $1,000 Discount
              </DialogTitle>
            </DialogHeader>

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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
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

            <div className="text-center text-sm text-gray-500 mt-4">
              By submitting this form, you agree to be contacted about roofing
              services.
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
