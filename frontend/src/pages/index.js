import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layouts'
import HeroSection from '@/components/HeroSection'
import JobSection from '@/components/JobSection'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
      <>
      <Layout >
        <HeroSection />
        <JobSection />
      </Layout>
      </>

  )
}
