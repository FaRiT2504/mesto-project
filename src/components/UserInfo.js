export class UserInfo {
  constructor({ nameSelector, jobSelector }, getProfileInfo, handlerProfileFormSubmit, updateProfileInfo) {
    this.nameSelector = nameSelector;
    this.jobSelector = jobSelector;
    this.getProfileInfo = getProfileInfo;
    this.handlerProfileFormSubmit = handlerProfileFormSubmit;
    this.updateProfileInfo = updateProfileInfo;

  }
  getUserInfo() {
    return this.getProfileInfo;
  }
  setUserInfo() {
    this.handlerProfileFormSubmit;
    this.updateProfileInfo
  }
}
