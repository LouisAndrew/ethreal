import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/tslint/config
function SvgInstagram(props: any) {
    return (
        <svg viewBox="0 0 512 512" width="1em" height="1em" {...props}>
            <path d="M352 0H160C71.648 0 0 71.648 0 160v192c0 88.352 71.648 160 160 160h192c88.352 0 160-71.648 160-160V160C512 71.648 440.352 0 352 0zm112 352c0 61.76-50.24 112-112 112H160c-61.76 0-112-50.24-112-112V160C48 98.24 98.24 48 160 48h192c61.76 0 112 50.24 112 112v192z" />
            <path d="M256 128c-70.688 0-128 57.312-128 128s57.312 128 128 128 128-57.312 128-128-57.312-128-128-128zm0 208c-44.096 0-80-35.904-80-80 0-44.128 35.904-80 80-80s80 35.872 80 80c0 44.096-35.904 80-80 80z" />
            <circle cx={393.6} cy={118.4} r={17.056} />
        </svg>
    );
}

export default SvgInstagram;
