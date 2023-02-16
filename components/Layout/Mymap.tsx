import Head from 'next/head';

function MyMap() {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.css" />
        </Head>
        <div id="map-container" style={{ width: '100%', height: '400px' }} />
      </>
    );
  }
  