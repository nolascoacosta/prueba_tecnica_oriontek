import Link from 'next/link'
const SocialSignup = ({ url, service, styleButton }) => {
  return (
      <Link href={url}>
        <a className={styleButton}>{service}</a>
      </Link>
  );
};

export default SocialSignup;