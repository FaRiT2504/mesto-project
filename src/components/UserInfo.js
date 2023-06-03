export class UserInfo {
  constructor({ nameSelector, jobSelector }, getProfileInfo, handlerProfileFormSubmit) {
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
    profileName.textContent = this.getUserInfo().name;
    profileJob.textContent = this.getUserInfo().about;
    profileAvatar.style.backgroundImage = `url(${this.getUserInfo().avatar})`;
  }
}
