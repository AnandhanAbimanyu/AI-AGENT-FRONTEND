'use client';

import Layout from '@/components/Layout';
import SocialSignInTemplate from '@/components/SocialSignInTemplate';

export default function MicrosoftSignInPage() {
  return (
    <Layout>
      <SocialSignInTemplate
        platform="Microsoft"
        color="bg-gray-800"
        icon={
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
          </svg>
        }
      />
    </Layout>
  );
}
