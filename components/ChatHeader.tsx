"use client"

import React from 'react'
import { Button } from './ui/button'
import { supbaseBrowswer } from '@/lib/supabase/browser'
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function ChatHeader({user}:{user:User | undefined}) {
  
    const router = useRouter();
    const handleLoginWithGithub = () => {

        const supabase = supbaseBrowswer();

        supabase.auth.signInWithOAuth({

                provider:"github",

                options:{
                    redirectTo:location.origin + "/auth/callback",
                }

        });
    };

    const handleLogout = async () => {

      const supabase = supbaseBrowswer();
      await supabase.auth.signOut();
      router.refresh();
    }

    return (
    <div className="h-20">
          <div className="p-5 border-b flex items-center justify-between">
            <div>
              <h1 className=" text-xl font-bold">Chat Away</h1>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-green-500 rounded-full animated-pulse"></div>
                <h1 className="text-sm text-gray-400">1 Online</h1>
              </div>
            </div>
            {user ? (<Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={handleLoginWithGithub}>Login</Button>
            )}
            
            
          </div>
        </div>
  )
}
