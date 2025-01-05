// Hàm chuyển đổi thời gian sang định dạng d-m-Y H:i:s
const convertToVietnamTime = (utcDate) => {
    const date = new Date(utcDate);
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false,
      timeZone: 'Asia/Ho_Chi_Minh'
    };
    return date.toLocaleString('vi-VN', options);
};

export default convertToVietnamTime;