import { auth, signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Facebook, Github } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Loginpage = async () => {
    const session = await auth();
    if(session?.user) return redirect("/");
    return (
    <div className='flex flex-col items-center justify-center py-5 md:py-10 gap-5'>
        <div className='bg-gray-100 flex items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold text-center'>Sign in</CardTitle>
                        <CardDescription className='text-center'>
                            Choose your preferred sign in method
                        </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 w-full min-w-[420] max-w-md'>
                    <div className='space-y-2'>
                        <form
                            action={ async () => {
                            "use server"
                            await signIn("google")
                            }}
                            
                        >
                            <Button type='submit' variant='outline'
                                className='w-full justify-center space-x-2 bg-white hover:bg-gray-100 hoverEffect'>
                                <FcGoogle/>
                                <span>Sign in with Google</span>
                            </Button>
                        </form>
                        <form
                            action={ async () => {
                            "use server"
                            await signIn("github")
                            }}
                        >
                            <Button type='submit' variant='outline'
                            className='w-full justify-center space-x-2 bg-white hover:bg-gray-100 hoverEffect'>
                                <Github/>
                                <span>Sign in with Github</span>
                            </Button>
                        </form>
                        <form
                            action={ async () => {
                            "use server"
                            await signIn("Facebook")
                            }}
                            
                        >
                            <Button type='submit' variant='outline'
                            className='w-full justify-center space-x-2 bg-white hover:bg-gray-100 hoverEffect'>
                                <Facebook className='w-5 h-5'/>
                                <span>Sign in with Facebook</span>
                            </Button>
                        </form>
                        <div className='relative'>
                            <div className='absolute inset-0 flex item-center'>
                                <span className='w-full border-t'></span>
                            </div>
                        </div>
                        <div className='relative flex justify-center text-us uppercase'>
                            <span className='bg-white px-2 text-gray-500'>or Continue With</span>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input id='email' type='email' placeholder='m@example.com' />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Password</Label>
                        <Input id='password' type='password' />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full bg-orange-500 hover:bg-orange-700 hoverEffect'>Sign in</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
    )
}

export default Loginpage