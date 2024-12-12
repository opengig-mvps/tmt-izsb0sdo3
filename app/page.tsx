'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User, ArrowRight, Check, Calendar, LineChart, Users, Settings } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-pink-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-pink-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-pink-900">
                    Manage Your Time Efficiently
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-pink-700">
                    Log your work details, track projects, and manage your time with ease using our time management platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-pink-700 text-white hover:bg-pink-600">Get Started</Button>
                  <Button variant="outline" className="border-pink-700 text-pink-700 hover:bg-pink-100">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-900">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pink-700">
                  Our platform offers a variety of features to help you manage your time and projects efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Calendar className="h-12 w-12 text-pink-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-pink-900">Track Time</h3>
                  <p className="text-muted-foreground text-pink-700">
                    Log your work hours and manage your tasks efficiently.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <LineChart className="h-12 w-12 text-pink-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-pink-900">Detailed Analytics</h3>
                  <p className="text-muted-foreground text-pink-700">
                    Get insights into your work patterns and productivity.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Users className="h-12 w-12 text-pink-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-pink-900">Team Collaboration</h3>
                  <p className="text-muted-foreground text-pink-700">
                    Collaborate with your team and manage projects together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-900">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pink-700">
                  Hear from our satisfied users about their experience with our platform.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-pink-900">John Doe</p>
                      <p className="text-xs text-muted-foreground text-pink-700">Product Manager</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pink-700">
                    "This platform has transformed the way I manage my projects. The detailed analytics and team collaboration features are top-notch."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-pink-900">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground text-pink-700">Team Lead</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pink-700">
                    "The best time management tool I've ever used. Highly recommended for teams and individuals alike."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-pink-900">Michael Johnson</p>
                      <p className="text-xs text-muted-foreground text-pink-700">Developer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pink-700">
                    "I love how easy it is to log my work hours and track my projects. The user interface is clean and intuitive."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-900">Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-pink-700">
                  Choose the plan that best fits your needs.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-pink-900">Starter</h3>
                    <p className="text-4xl font-bold text-pink-900">
                      $9<span className="text-2xl font-medium text-muted-foreground text-pink-700">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-muted-foreground text-pink-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Basic Features
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      5 Projects
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Email Support
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-700 text-white hover:bg-pink-600">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-pink-700 text-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-4xl font-bold">
                      $19<span className="text-2xl font-medium text-white/80">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-white">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      All Starter Features
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Unlimited Projects
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Priority Support
                    </li>
                  </ul>
                  <Button className="w-full bg-white text-pink-700 hover:bg-white/90">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-pink-900">Enterprise</h3>
                    <p className="text-4xl font-bold text-pink-900">
                      $49<span className="text-2xl font-medium text-muted-foreground text-pink-700">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-muted-foreground text-pink-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      All Pro Features
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Custom Integrations
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Dedicated Support
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-700 text-white hover:bg-pink-600">Get Started</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-pink-100 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm text-pink-900">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
            <a href="#">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Community</a>
            <a href="#">Templates</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;