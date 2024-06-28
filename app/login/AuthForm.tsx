"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "@/components/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

const AuthForm = () => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const attemptLogin: SubmitHandler<FormData> = async (formData: FormData) => {
    console.log(formData);

    const { data: { user }, error } = await signInWithEmailAndPassword({
      email: formData.username,
      password: formData.password,
    });

    if (error || !user) {
      toast("Failed to login...", {
        description: `Username or password is incorrect, please try again!`,
      });
    } else {
      if (user.user_metadata.activated === true) {
        toast("Successfully Logged In", {
          description: `Welcome ${user.user_metadata.full_name}!`,
        });

        if (user.user_metadata.vendor_or_client === "C") {
          router.push("/clientportal/projects");
        } else {
          router.push("/vendorportal/dashboard/home");
        }
      } else {
        router.push("/updateuser"); // TODO implement
      }
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Card className="lg:w-[30vw] lg:h-[60vh]">
        <CardContent className="w-full h-full flex justify-center items-center z-50">
          <div className="w-11/12 mt-2">
            <h1 className="font-bold text-3xl">Login</h1>
            <Form {...form}>
              <form onSubmit={handleSubmit(attemptLogin)}>
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <h1 className="font-bold text-lg">Username</h1>
                      <Input type="text" {...register("username")} />
                      {errors.username && (
                        <p className="text-red-400 text-xs">
                          {errors.username.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <h1 className="font-bold text-lg mt-5">Password</h1>
                      <Input type="password" {...register("password")} />
                      {errors.password && (
                        <p className="text-red-400 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-5 w-full bg-indigo-500">
                  Sign in
                </Button>
              </form>
            </Form>
            <div className="mt-5">
              <Separator className="" />
              <Link href={``}>
                <Button className="w-full mt-5">Create New Account</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthForm;
