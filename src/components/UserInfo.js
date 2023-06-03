export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }, getProfileInfo, updateProfileInfo) {
    this.profileName = document.querySelector(nameSelector);
    this.profileJob = document.querySelector(jobSelector);
    this._updateProfileInfo = updateProfileInfo;
    getProfileInfo().then(user => {
      this.profileName.textContent = user.name;
      this.profileJob.textContent = user.about;
    })
  }
  getUserInfo() {
    return {
      name: this.profileName.textContent,
      about: this.profileJob.textContent
    }
  }
  setUserInfo({ name, about }) {
    this._updateProfileInfo(name, about).then(user => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;
    })
  }
}
