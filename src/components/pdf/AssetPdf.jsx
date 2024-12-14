import React from 'react';
import firstPdf from '../../assets/pdfAsset/firstPdf.pdf';
import secondPdf from '../../assets/pdfAsset/secondPdf.pdf';
const AssetPdf = () => {
     const assetPdf=[
        {
            src:firstPdf,
            uniqueID:"firstPdf",
            topic:"Relation"

        },
        {
            src:secondPdf,
            uniqueID:"secondPdf",
            topic:"Function"
            
        }
     ]
    return {assetPdf}
};

export default AssetPdf;