import {useContext, useState} from "react";
import {updatePassword} from "../../http/userApi.js";
import ProfileAuxWindow from "./ProfileAuxWindow.jsx";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";

const ProfileSecurity = observer(() => {
  const {user} = useContext(AuthContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const update = async (e) => {
    e.preventDefault()
    try {
      if (newPassword.length >= 6) {
        const data = await updatePassword(
          oldPassword,
          newPassword
        )
        alert(data)
      } else {
        alert('New password should contain at least 6 characters')
      }
    } catch (e) {
      if (e.response.status === 403) {
        alert(e.response.data)
      }
    }
  }

  return (
    <div className={"row"}>
      <div className={"col-lg-9"}>
        <div className={"py-5 border-bottom border-2"}>
          <h6 className={"fw-bold"}>Email</h6>
          <p className={"text-secondary m-0"}>{user._user.sub}</p>
        </div>
        <div className={"py-5 border-bottom border-2"}>
          <div className={"d-flex justify-content-between align-items-center"}>
            <div className={""}>
              <h6 className={"fw-bold"}>Password</h6>
              <p className={"text-secondary m-0"}>Last updated 1 month ago</p>
            </div>
            <button
              type={"button"}
              className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}
              data-bs-toggle="modal"
              data-bs-target="#changePassword"
            >
              Update password
            </button>
          </div>
        </div>
        <div className={"py-5 border-bottom border-2"}>
          <div className={"d-flex justify-content-between align-items-center"}>
            <div className={""}>
              <h6 className={"fw-bold"}>Restore password</h6>
              <p className={"text-secondary m-0"}>Last updated 1 month ago</p>
            </div>
            <button
              type={"button"}
              className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}
              data-bs-toggle="modal"
              data-bs-target="#restorePassword"
            >
              Restore password
            </button>
          </div>
        </div>
        {/*Change password modal*/}
        <div className="modal fade"
             id="changePassword"
             tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update password
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={update}>
                <div className="modal-body">
                  <div className="my-4 mx-auto w-75">
                    <label
                      htmlFor="exampleInputOldPassword"
                      className="form-label opacity-75"
                    >
                      Old password
                    </label>
                    <input
                      type="password"
                      className="form-control p-3"
                      id="exampleInputOldPassword"
                      placeholder="Old password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 mx-auto w-75">
                    <label
                      htmlFor="exampleInputNewPassword"
                      className="form-label opacity-75"
                    >
                      New password
                    </label>
                    <input
                      type="password"
                      className="form-control p-3"
                      id="exampleInputNewPassword"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button type="submit" className="btn btn-primary w-100 p-2">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/*Restore password modal*/}
        <div className="modal fade"
             id="restorePassword"
             tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update password
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={() => {
              }}>
                <div className="modal-body">
                  <div className="my-4 mx-auto w-75">
                    <label htmlFor="restoreEmail"
                           className="form-label opacity-75">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control p-3"
                      id="restoreEmail"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="mb-4 mx-auto w-75">
                    <label htmlFor="restoreNewPassword"
                           className="form-label opacity-75">
                      New password
                    </label>
                    <input
                      type="password"
                      className="form-control p-3"
                      id="restoreNewPassword"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="mb-4 mx-auto w-75">
                    <label htmlFor="restoreConfirmPassword"
                           className="form-label opacity-75">
                      Confirm New password
                    </label>
                    <input
                      type="password"
                      className="form-control p-3"
                      id="restoreConfirmPassword"
                      placeholder="Enter new password again"
                    />
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button type="submit" className="btn btn-primary w-100 p-2">
                    Restore
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={"col-lg-3"}>
        <ProfileAuxWindow/>
      </div>
    </div>
  )
})

export default ProfileSecurity