import Link from "next/link";

import styles from "@/styles/HeroSection.module.scss";
import Button from "@/components/Hero/Button"
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.hero__left}>
          <div className={styles.title}>
            <h2>
              Lets Be Kind and
              <br />
              <span> Donate</span>
            </h2>
          </div>
          <div className={styles.subTitle}>
            <p>Step forward and donate for the noble cause,</p>
            <p>your single penny matters alot.</p>
          </div>
          <Button>
            <Link className={styles.link} href="/donate-with-checkout">
              Donate Now
            </Link>
          </Button>
        </div>
        <div className={styles.hero__right}>
          <Image
            src="/donation-image.jpg"
            alt="Image"
            width={500}
            height={500}
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
