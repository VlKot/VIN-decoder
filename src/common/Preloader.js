import React from 'react'
import preloader from '../assets/preloader.svg'

const styles = {
    preloaderCenter: {
        textAlign: "center",
        zIndex: "1",
    },

}

export const Preloader = () =>
    <div>
        <img style={styles.preloaderCenterImg} src={preloader} alt="preloader"/>
    </div>