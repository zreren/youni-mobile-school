import React from 'react';
import styles from './index.module.css';
import Icon1 from './1.svg';
import Icon2 from './2.svg';
import Icon3 from './3.svg';
import Icon4 from './4.svg';
import Icon5 from './5.svg';
import Subtract from './Subtract.svg';
export default function index() {
  return (
    <div className="fixed top-0 z-30 w-screen h-screen backdrop-filter backdrop-blur-2xl">
      <div className={styles.element}>
        <Icon4></Icon4>
      </div>
      <div className={styles.element}>
        <Icon5></Icon5>
      </div>
      <div className={styles.element}>
        <Icon1></Icon1>
      </div>
      <div className={styles.element}>
        <Icon2></Icon2>
      </div>
      <div className={styles.element}>
        <Icon3></Icon3>
      </div>
      <Subtract className="absolute bottom-0 w-screen -z-30"></Subtract>
    </div>
  );
}
