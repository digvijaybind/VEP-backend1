class UserDto {
  name;
  email;
  userType;

  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.userType = user.userType;
  }
}

module.exports = UserDto;
