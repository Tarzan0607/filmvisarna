module.exports =  function dateNow() {
    const AD = new Date;
    const ADY = AD.getFullYear();
    let ADM = AD.getMonth() + 1;
    let ADD = AD.getDate();
    let ADH = AD.getHours();
    let ADMI = AD.getMinutes();
    let ADS = AD.getSeconds();

    if (ADD < 10) {
        ADD = '0' + AD.getDate();
    }
    if (ADM < 10) {
        ADM = '0' + ADM;
    }
    if (ADH < 10) {
        ADH = '0' + AD.getHours();
    }
    if (ADMI < 10) {
        ADMI = '0' + AD.getMinutes();
    }
    if (ADS < 10) {
        ADS = '0' + AD.getSeconds();
    }

    return `${ADY}-${ADM}-${ADD} ${ADH}:${ADMI}:${ADS}`;
}