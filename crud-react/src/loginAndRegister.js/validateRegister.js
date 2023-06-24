const isValid = {
  email: 'initial',
  nickname: 'initial',
  id: 'initial',
  password: 'initial',
  passValid: false
};

const validate = {
  email: email => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(String(email).toLowerCase());
  },
  nickname: nickname => {
    const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,15}$/;
    return nicknameRegex.test(nickname);
  },
  user_id: user_id => {
    const idRegex = /^[a-zA-Z0-9_-]{4,20}$/;
    return idRegex.test(user_id);
  },
  password: password => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/-=]{6,20}$/;
    return passwordRegex.test(password);
  }
};

export const validateRegister = ({email, nickname, user_id, password}) => {

  // 유효성 검사 실패/성공 시 false/true, 초기값 initial
  isValid.email = validate.email(email);
  isValid.nickname = validate.nickname(nickname);
  isValid.id = validate.user_id(user_id);
  isValid.password = validate.password(password);

  if (isValid.email && isValid.nickname && isValid.id && isValid.password) {
    isValid.passValid = true;
  }

  return(isValid);
}