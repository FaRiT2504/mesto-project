export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }, setProfileInfo, setAvatar) {
    this.profileName = document.querySelector(nameSelector);
    this.profileJob = document.querySelector(jobSelector);
    this.profileAvatar = document.querySelector(avatarSelector);
    this._setProfileInfo = setProfileInfo;
    this._setAvatar = setAvatar;
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  getUserInfo() {
    return {
      name: this.profileName.textContent,
      about: this.profileJob.textContent,
      userId: this.profileName.dataset.userId
    }
  }
  setUserInfo = ({ name, about }) => this._setProfileInfo(name, about).then(user => {
    this.profileName.textContent = user.name;
    this.profileJob.textContent = user.about;
    this.profileName.dataset.userId = user._id
  })


  setUserAvatar = ({ url }) => this._setAvatar(url)
    .then((user) => {
      this.profileAvatar.style.backgroundImage = `url(${user.avatar})`
    })
}
