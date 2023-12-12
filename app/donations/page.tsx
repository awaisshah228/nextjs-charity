import DonateHero from "@/components/Hero/DonateHero";
import DonationForm from "@/components/Hero/DonationForm";
import Head from "next/head";


export default function DonateUs() {
  return (
    <div>
      <Head>
        <title>Donate US</title>
        <meta name="description" content="Donate Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DonateHero />
        <DonationForm />
      </main>
    </div>
  );
}
