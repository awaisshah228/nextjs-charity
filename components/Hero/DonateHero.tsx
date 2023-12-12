
import styles from "../../styles/DonateUsHero.module.scss";
import Image from "next/image";

const DonateUsHero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Image
          src="/hero-donation-image.jpg"
          alt="Image"
          width={500}
          height={100}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
    </section>
  );
};

export default DonateUsHero;
