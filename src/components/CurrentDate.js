function CurrentDate() {
    var currDate = new Date();
    var date = currDate.getFullYear() + '-' + (currDate.getMonth()+1) + '-' + currDate.getDate();
    const newCurrDate = date;

    return(
        <div>{newCurrDate}</div>
    );
}

export default CurrentDate;