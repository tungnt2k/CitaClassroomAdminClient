import React from 'react';
import { Modal } from 'antd';
import s from './styles.less';
import { useIntl } from 'umi';
import { connect } from 'dva';
import { ACCOUNT_ACTIVE, ACCOUNT_ROLE_ADMIN, MALE } from '@/configs/constant';

const { formatMessage } = useIntl();

function ModalViewAccount(props) {
  const {
    modalVisible,
    handleModalAccount,
    accountStore,
    openEditAccountModal,
    dispatch,
  } = props;
  const { currentAccount } = accountStore;

  const handleEditAccount = () => {
    handleModalAccount(false);
    openEditAccountModal(true);
  };

  const handleCloseModal = () => {
    dispatch({ type: 'ACCOUNT/updateStore', payload: { currentAccount: {} } });
    handleModalAccount(false);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        className={`${s.ModalViewAccount} modalAccount text-gray`}
        onCancel={handleCloseModal}
        footer={null}
        centered
        title={formatMessage({ id: 'i18n_account_information' })}
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
          <div className="viewProfile">
            <div className={`${s.avtBox} d-flex align-items-center`}>
              <div className={s.avt}>
                <img src={currentAccount.avatar} className="avt110" alt="" />
              </div>
              <div className={s.info}>
                <div className="text-bold text-16 text-name">
                  {currentAccount.adminName}
                </div>
                <span className="text-14 text-dark">
                  {currentAccount.email}
                </span>
              </div>
            </div>
            <div className={s.mainView}>
              <ul className={s.list}>
                <li className={s.item}>
                  <div className={s.left}>
                    <span className="text-14 text-gray">
                      {formatMessage({ id: 'i18n_status' })}
                    </span>
                  </div>
                  <div className={s.right}>
                    {currentAccount.status === ACCOUNT_ACTIVE ? (
                      <div className="sttClass happening">
                        <i className="icon icon-stt"></i>
                        <span className="text-14 nameStt">
                          {' '}
                          {formatMessage({ id: 'i18n_active' })}
                        </span>
                      </div>
                    ) : (
                      <div className="sttClass happened">
                        <i className="icon icon-stt"></i>
                        <span className="text-14 nameStt">
                          {formatMessage({ id: 'i18n_inactive' })}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
                <li className={s.item}>
                  <div className={s.left}>
                    <span className="text-14 text-gray">
                      {formatMessage({ id: 'i18n_role_name' })}
                    </span>
                  </div>
                  <div className={s.right}>
                    <span className="text-14 text-dark">
                      {currentAccount.userRoleId === ACCOUNT_ROLE_ADMIN
                        ? formatMessage({ id: 'i18n_role_admin' })
                        : formatMessage({ id: 'i18n_role_manager' })}
                    </span>
                  </div>
                </li>
                <li className={s.item}>
                  <div className={s.left}>
                    <span className="text-14 text-gray">
                      {formatMessage({ id: 'i18n_gender' })}
                    </span>
                  </div>
                  <div className={s.right}>
                    <span className="text-14 text-dark">
                      {currentAccount.sex === MALE
                        ? formatMessage({ id: 'i18n_male' })
                        : formatMessage({ id: 'i18n_female' })}
                    </span>
                  </div>
                </li>
                <li className={s.item}>
                  <div className={s.left}>
                    <span className="text-14 text-gray">
                      {formatMessage({ id: 'i18n_phonenumber' })}
                    </span>
                  </div>
                  <div className={s.right}>
                    <span className="text-14 text-dark">
                      {currentAccount.phone}
                    </span>
                  </div>
                </li>
                <li className={s.item}>
                  <div className={s.left}>
                    <span className="text-14 text-gray">
                      {formatMessage({ id: 'i18n_created_date' })}
                    </span>
                  </div>
                  <div className={s.right}>
                    <span className="text-14 text-dark">
                      {currentAccount.createdAt}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className={s.modal_action}>
              <button
                className="btn btn-md btn-cancel"
                onClick={handleCloseModal}
              >
                {formatMessage({ id: 'i18n_cancel' })}
              </button>
              <button
                className="btn btn-md btn-update"
                onClick={handleEditAccount}
              >
                {formatMessage({ id: 'i18n_eit' })}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default connect(({ ACCOUNT }) => ({ accountStore: ACCOUNT }))(
  ModalViewAccount,
);
