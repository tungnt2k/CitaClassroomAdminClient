import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, Spin } from 'antd';
import { connect } from 'dva';
import {
  MALE,
  FEMALE,
  ACCOUNT_ACTIVE,
  ACCOUNT_INACTIVE,
} from '@/configs/constant';
import { useIntl } from 'umi';
import s from './styles.less';
import ImgCrop from 'antd-img-crop';
import { uploadFile } from '@/utils/upload';
import { beforeUpload } from '@/utils/commonFunc';
import 'antd/es/slider/style';

const { Option } = Select;
const { formatMessage } = useIntl();

function ModalUpdateAccount(props) {
  const {
    modalVisible,
    handleModalAccount,
    accountStore,
    profileStore,
    form,
    isModalUpdate,
    dispatch,
  } = props;
  const { getFieldDecorator, setFieldsValue, validateFields, resetFields } =
    form;
  const { currentAccount, isUpdateSuccess } = accountStore;
  const { adminName, phone, roleId, email, status, sex, avatar, id } =
    currentAccount;
  const { userDetail } = profileStore;
  const [currentAvatar, setCurrentAvatar] = useState(undefined);
  const [currentAvatarError, setCurrentAvatarError] = useState(undefined);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const isManager = JSON.parse(localStorage.getItem('isManager'));
  useEffect(() => {
    resetFields();
    setIsChangePassword(false);
    setFieldsValue({
      adminName,
      phone,
      userRoleId: roleId || ACCOUNT_ROLE_ADMIN,
      status: status || ACCOUNT_INACTIVE,
      sex: sex === FEMALE ? FEMALE : MALE,
      email,
    });
    setCurrentAvatar(avatar);
  }, [
    adminName,
    avatar,
    email,
    modalVisible,
    phone,
    resetFields,
    roleId,
    setFieldsValue,
    sex,
    status,
  ]);

  const handleClickSubmit = () => {
    const payload = {};
    // if (!currentAvatar) {
    //   setCurrentAvatarError('i18n_required_avatar_field');
    // }
    validateFields((errors, values) => {
      // if (!errors && currentAvatar) {
      if (!errors) {
        const { adminName, email, password, phone, sex, status, userRoleId } =
          values;
        payload.adminName = adminName;
        payload.email = email;
        payload.password = password;
        payload.phone = phone;
        payload.sex = sex;
        payload.status = status;
        payload.roleId = userRoleId;
        payload.avatar = currentAvatar;

        dispatch({ type: 'ACCOUNT/reUpdateList', payload: !isUpdateSuccess });
        if (isModalUpdate) {
          payload.id = id;
          userDetail.id === id
            ? dispatch({ type: 'PROFILE/updateAccountAdmin', payload })
            : dispatch({ type: 'ACCOUNT/updateAccountAdmin', payload });
        } else {
          dispatch({ type: 'ACCOUNT/createAccountAdmin', payload });
        }
        resetFields();
        handleModalAccount(false);
      }
    });
  };

  const validateToNewPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'i18n_confirm_pass_does_not_match' }));
    } else {
      callback();
    }
  };

  const setChangePassword = () => {
    setIsChangePassword(true);
  };

  const handleUploadAvatar = async ({ file }) => {
    setLoadingAvatar(true);
    if (beforeUpload(file)) {
      let formData = new FormData();
      formData.append('files', file);
      const { success, data, message } = await uploadFile(formData);
      if (success) {
        setCurrentAvatar(data[0]);
        setCurrentAvatarError(undefined);
      } else {
        setCurrentAvatarError(message);
      }
    }
    setLoadingAvatar(false);
  };

  const onCancelModal = () => {
    dispatch({ type: 'ACCOUNT/updateStore', payload: { currentAccount: {} } });
    resetFields();
    setCurrentAvatar(undefined);
    setCurrentAvatarError(undefined);
    handleModalAccount(false);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        className={`${s.ModalUpdateAccount} modalAccount text-gray`}
        onOk={() => handleModalAccount(true)}
        onCancel={onCancelModal}
        footer={null}
        centered
        title={
          isModalUpdate
            ? formatMessage({ id: 'i18n_update_account' })
            : formatMessage({ id: 'i18n_create_account' })
        }
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
          >
            <path
              d="M441.025,459.5l9.452-9.452a1.785,1.785,0,1,0-2.525-2.525l-9.452,9.452-9.452-9.452a1.785,1.785,0,0,0-2.525,2.525l9.452,9.452-9.452,9.452a1.785,1.785,0,1,0,2.525,2.525l9.452-9.452,9.452,9.452a1.785,1.785,0,0,0,2.525-2.525Z"
              transform="translate(-426 -447)"
            />
          </svg>
        }
      >
        <div className="content">
          <Form className="formAccount" autoComplete="false">
            <div className="avt-box view">
              <span className="label-form text-gray">
                {formatMessage({ id: 'i18n_avatar' })}
              </span>
              <div className="form-group relative avt110">
                <Spin spinning={loadingAvatar}>
                  <ImgCrop
                    modalTitle={formatMessage({ id: 'i18n_update_avatar' })}
                    grid
                  >
                    <Upload
                      customRequest={handleUploadAvatar}
                      showUploadList={false}
                      multiple={false}
                      accept={'image/*'}
                    >
                      <img
                        src={currentAvatar}
                        alt=""
                        className="avt avt-round avt110"
                      />
                      <label htmlFor="uploadAvt" className="labelUpload">
                        <i className="icon">
                          <svg
                            id="Group_3148"
                            data-name="Group 3148"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28.037"
                            height="22.067"
                            viewBox="0 0 28.037 22.067"
                          >
                            <path
                              id="Path_15832"
                              data-name="Path 15832"
                              d="M27.1,48.238a3.014,3.014,0,0,0-2.212-.933H20.468v-.053a2.393,2.393,0,0,0-.72-1.732,2.439,2.439,0,0,0-1.732-.72h-8a2.457,2.457,0,0,0-2.479,2.452v.053h-4.4a3.014,3.014,0,0,0-2.212.933A3.168,3.168,0,0,0,0,50.45V63.722a3.014,3.014,0,0,0,.933,2.212,3.168,3.168,0,0,0,2.212.933H24.892a3.014,3.014,0,0,0,2.212-.933,3.169,3.169,0,0,0,.933-2.212V50.45A3.014,3.014,0,0,0,27.1,48.238Zm-.453,15.484h-.027a1.729,1.729,0,0,1-1.732,1.732H3.145a1.729,1.729,0,0,1-1.732-1.732V50.45a1.729,1.729,0,0,1,1.732-1.732H8.288a.717.717,0,0,0,.72-.72v-.773a1,1,0,0,1,1.039-1.039h7.969a1,1,0,0,1,1.039,1.039V48a.717.717,0,0,0,.72.72h5.144a1.729,1.729,0,0,1,1.732,1.732Z"
                              transform="translate(0 -44.8)"
                              fill="#333"
                            />
                            <path
                              id="Path_15833"
                              data-name="Path 15833"
                              d="M118.556,130.8a6.551,6.551,0,1,0,4.637,1.919A6.568,6.568,0,0,0,118.556,130.8Zm3.625,10.207a5.147,5.147,0,0,1-7.249,0,5.1,5.1,0,0,1-1.492-3.625,5.208,5.208,0,0,1,1.492-3.624,5.1,5.1,0,0,1,3.625-1.492,5.208,5.208,0,0,1,3.625,1.492,5.1,5.1,0,0,1,1.492,3.624A4.987,4.987,0,0,1,122.181,141.007Z"
                              transform="translate(-104.538 -125.07)"
                              fill="#333"
                            />
                            <circle
                              id="Ellipse_426"
                              data-name="Ellipse 426"
                              cx="1.306"
                              cy="1.306"
                              r="1.306"
                              transform="translate(22.2 5.703)"
                              fill="#333"
                            />
                          </svg>
                        </i>
                      </label>
                    </Upload>
                  </ImgCrop>
                </Spin>
              </div>
              <div>
                {currentAvatarError && (
                  <div className="ant-form-explain">
                    {formatMessage({ id: currentAvatarError })}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Form.Item label={formatMessage({ id: 'i18n_name' })}>
                  {getFieldDecorator('adminName', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({ id: 'i18n_check_name' }),
                      },
                    ],
                  })(
                    <Input
                      placeholder={formatMessage({ id: 'i18n_name' })}
                      autoComplete="off"
                    />,
                  )}
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item
                  label={formatMessage({ id: 'i18n_role_name' })}
                  className="text-gray"
                >
                  {getFieldDecorator('userRoleId', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                    initialValue: ACCOUNT_ROLE_ADMIN,
                  })(
                    <Select
                      className="filter-instructor"
                      placeholder={formatMessage({ id: 'i18n_role_name' })}
                      disabled={!isManager}
                    >
                      <Option value={ACCOUNT_ROLE_ADMIN}>
                        {formatMessage({ id: 'i18n_role_admin' })}
                      </Option>
                      <Option value={ACCOUNT_ROLE_MANAGER}>
                        {formatMessage({ id: 'i18n_role_manager' })}
                      </Option>
                    </Select>,
                  )}
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label={formatMessage({ id: 'i18n_status' })}>
                  {getFieldDecorator('status', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                    initialValue: ACCOUNT_INACTIVE,
                  })(
                    <Select
                      className="filter-instructor"
                      placeholder={formatMessage({ id: 'i18n_status' })}
                    >
                      <Option value={ACCOUNT_ACTIVE}>
                        <div className="sttClass happening">
                          <i className="icon icon-stt"></i>
                          <span className="text-14 nameStt">
                            {formatMessage({ id: 'i18n_active' })}
                          </span>
                        </div>
                      </Option>
                      <Option value={ACCOUNT_INACTIVE}>
                        <div className="sttClass happened">
                          <i className="icon icon-stt"></i>
                          <span className="text-14 nameStt">
                            {formatMessage({ id: 'i18n_inactive' })}
                          </span>
                        </div>
                      </Option>
                    </Select>,
                  )}
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label={formatMessage({ id: 'i18n_phonenumber' })}>
                  {getFieldDecorator('phone', {
                    getValueFromEvent: (event) => {
                      let result = event.target.value;
                      result = result.replace(/[^0-9]/, '');
                      return result;
                    },
                    rules: [
                      // {
                      //   required: true,
                      //   message: formatMessage({ id: 'i18n_check_phone' }),
                      // },
                    ],
                  })(
                    <Input
                      placeholder={formatMessage({ id: 'i18n_phonenumber' })}
                      autoComplete="off"
                    />,
                  )}
                </Form.Item>
              </div>
              <div className="col-6">
                <Form.Item label={formatMessage({ id: 'i18n_gender' })}>
                  {getFieldDecorator('sex', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                    initialValue: MALE,
                  })(
                    <Select
                      className="filter-instructor"
                      placeholder={formatMessage({ id: 'i18n_gender' })}
                    >
                      <Option value={MALE}>
                        {formatMessage({ id: 'i18n_male' })}
                      </Option>
                      <Option value={FEMALE}>
                        {formatMessage({ id: 'i18n_female' })}
                      </Option>
                    </Select>,
                  )}
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item label={formatMessage({ id: 'i18n_email' })}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: formatMessage({ id: 'i18n_invalid_email' }),
                      },
                      {
                        required: true,
                        message: formatMessage({ id: 'i18n_email_address' }),
                      },
                    ],
                  })(
                    <Input
                      placeholder="example@example.com"
                      autoComplete={isModalUpdate ? 'off' : 'new-password'}
                      disabled={!isManager}
                    />,
                  )}
                </Form.Item>
              </div>
              {id === undefined ? (
                <>
                  <div className="col-12">
                    <Form.Item
                      className={s.inputPass}
                      label={formatMessage({
                        id: 'i18n_change_pass_new_password',
                      })}
                    >
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({
                              id: 'i18n_required_password',
                            }),
                          },
                          {
                            min: 8,
                            message: formatMessage({
                              id: 'i18n_login_password_length8',
                            }),
                          },
                        ],
                      })(
                        <Input.Password
                          autoComplete="false"
                          placeholder={formatMessage({
                            id: 'i18n_login_password',
                          })}
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className="col-12">
                    <Form.Item
                      className={s.inputPass}
                      label={formatMessage({
                        id: 'i18n_change_pass_confirm_password',
                      })}
                    >
                      {getFieldDecorator('confirmPassword', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({
                              id: 'i18n_required_password',
                            }),
                          },
                          {
                            validator: validateToNewPassword,
                          },
                        ],
                      })(
                        <Input.Password
                          autoComplete="false"
                          placeholder={formatMessage({
                            id: 'i18n_login_password',
                          })}
                        />,
                      )}
                    </Form.Item>
                  </div>
                </>
              ) : (
                <>
                  <p
                    className={isChangePassword ? s.hidetxt : s.txtchangePass}
                    onClick={() => setChangePassword()}
                  >
                    {`${formatMessage({ id: 'i18n_request_change_pass' })}?`}{' '}
                  </p>
                  {isChangePassword ? (
                    <>
                      <div className="col-12">
                        <Form.Item
                          className={s.inputPass}
                          label={formatMessage({
                            id: 'i18n_change_pass_new_password',
                          })}
                        >
                          {getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: formatMessage({
                                  id: 'i18n_required_password',
                                }),
                              },
                              {
                                min: 8,
                                message: formatMessage({
                                  id: 'i18n_login_password_length8',
                                }),
                              },
                            ],
                          })(
                            <Input.Password
                              autoComplete="false"
                              placeholder={formatMessage({
                                id: 'i18n_login_password',
                              })}
                            />,
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-12">
                        <Form.Item
                          className={s.inputPass}
                          label={formatMessage({
                            id: 'i18n_change_pass_confirm_password',
                          })}
                        >
                          {getFieldDecorator('confirmPassword', {
                            rules: [
                              {
                                required: true,
                                message: formatMessage({
                                  id: 'i18n_required_password',
                                }),
                              },
                              {
                                validator: validateToNewPassword,
                              },
                            ],
                          })(
                            <Input.Password
                              autoComplete="false"
                              placeholder={formatMessage({
                                id: 'i18n_login_password',
                              })}
                            />,
                          )}
                        </Form.Item>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
            <div className={s.modal_action}>
              <button className="btn btn-md btn-cancel" onClick={onCancelModal}>
                {formatMessage({ id: 'i18n_cancel' })}
              </button>
              <button
                className="btn btn-md btn-update"
                onClick={handleClickSubmit}
              >
                {isModalUpdate
                  ? formatMessage({ id: 'i18n_save_button' })
                  : formatMessage({ id: 'i18n_button_create' })}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default connect(({ ACCOUNT, PROFILE }) => ({
  accountStore: ACCOUNT,
  profileStore: PROFILE,
}))(Form.create()(ModalUpdateAccount));
