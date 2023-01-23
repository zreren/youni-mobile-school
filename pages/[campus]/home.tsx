import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function home() {
  const router = useRouter();
  const campus = router.query.campus;
  useEffect(() => {
    router.push(`/${campus}`);
  }, [campus]);
  return <div></div>;
}
