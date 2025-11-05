import React from 'react';

const Logo: React.FC<{ src: string, alt: string }> = ({ src, alt }) => (
    <img
      className="h-10 w-auto dark:invert"
      src={src}
      alt={alt}
      loading="lazy"
    />
);

const SocialProof: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-slate-200">
          Tüm Global Gelir Kaynaklarınızla Uyumlu Çalışır
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          <Logo src="https://tailwindui.com/img/logos/158x48/stripe-logo-gray-900.svg" alt="Stripe" />
          <Logo src="https://tailwindui.com/img/logos/158x48/google-logo-gray-900.svg" alt="Google AdSense" />
          <Logo src="https://upload.wikimedia.org/wikipedia/commons/9/93/Patreon_logo.svg" alt="Patreon" />
          <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_logo_%282017%29.svg/1024px-YouTube_full-color_logo_%282017%29.svg.png" alt="YouTube" />
          <Logo src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Gumroad_logo.svg" alt="Gumroad" />
          <Logo src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Upwork-logo.svg" alt="Upwork" />
        </div>
      </div>
    </div>
  );
};

export default SocialProof;