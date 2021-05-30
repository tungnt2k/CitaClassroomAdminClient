import React, { useEffect, useState, useCallback } from 'react';
import { Input, Select, Table, Menu, Dropdown } from 'antd';
import s from './styles.less';
import { connect } from 'dva';
import ModalViewAccount from '../view';
import ModalAccount from '../update';
import { PAGE_SIZE, ACCOUNT_ACTIVE } from '@/configs/constant';
import LoadingComponent from '@/components/Loading';
import { checkSex } from '@/utils/commonFunc';

const { Option } = Select;

const headerPage = {
  title: formatMessage({ id: 'i18n_sidebar_account_manager' }),
  addClass: true,
  btnAdd: formatMessage({ id: 'i18n_account_btn_add' }),
};

function AccountList(props) {
  const { dispatch, accountStore } = props;
  const { accountList, total, loading, isUpdateSuccess } = accountStore;
  const [modalViewVisible, setModalViewVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [adminRole, setAdminRole] = useState(undefined);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [textSearch, setTextSearch] = useState(undefined);
  const [textSearchTemp, setTextSearchTemp] = useState(undefined);

  const getAccountList = useCallback(() => {
    const payload = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE,
      sortBy: 'createdAt',
      sortType: 'DESC',
    };
    if (textSearch) {
      payload.keyword = textSearch;
    }
    if (adminRole) {
      payload.roleIds = [adminRole];
    }
    if (isUpdateSuccess) {
      dispatch({ type: 'ACCOUNT/getAccountList', payload });
    }
    dispatch({ type: 'ACCOUNT/getAccountList', payload });
  }, [dispatch, pageIndex, textSearch, adminRole, isUpdateSuccess]);

  const selectAccount = (account) => {
    setIsModalUpdate(true);
    dispatch({ type: 'ACCOUNT/getAccountDetail', payload: account.id });
  };

  const menu = (
    <Menu className="dropdown-action">
      <Menu.Item>
        <button
          className="btn btn-icon btn-action-table view"
          onClick={() => handleModalAccount(true, 'modalView')}
        >
          <i className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.049"
              height="10.975"
              viewBox="0 0 17.049 10.975"
            >
              <path
                id="Union_35"
                data-name="Union 35"
                d="M-2957.8,6.055a.908.908,0,0,1,0-1.135c.927-1.155,4.238-4.92,8.327-4.92s7.4,3.766,8.325,4.92a.91.91,0,0,1,0,1.135c-.927,1.155-4.238,4.92-8.325,4.92S-2956.875,7.21-2957.8,6.055Zm4.353-.568a3.974,3.974,0,0,0,3.974,3.974,3.973,3.973,0,0,0,3.973-3.974,3.973,3.973,0,0,0-3.973-3.973A3.973,3.973,0,0,0-2953.449,5.487Zm1.229,0a2.747,2.747,0,0,1,2.745-2.744,2.745,2.745,0,0,1,2.742,2.744,2.744,2.744,0,0,1-2.742,2.743A2.746,2.746,0,0,1-2952.22,5.488Zm1-.19h.909a.629.629,0,0,1,.624-.624V3.766A1.55,1.55,0,0,0-2951.216,5.3Z"
                transform="translate(2958)"
                fill="#666"
              />
            </svg>
          </i>
          <span className="text">{formatMessage({ id: 'i18n_view' })}</span>
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="btn btn-icon btn-action-table edit"
          onClick={() => handleModalAccount(true)}
        >
          <i className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.394"
              height="14.393"
              viewBox="0 0 14.394 14.393"
            >
              <path
                id="Union_34"
                data-name="Union 34"
                d="M-2956.459,14.393A1.542,1.542,0,0,1-2958,12.85V2.569a1.542,1.542,0,0,1,1.542-1.542h6.169a.514.514,0,0,1,.514.514.513.513,0,0,1-.514.514h-6.169a.515.515,0,0,0-.514.514V12.85a.515.515,0,0,0,.514.515h9.253a.515.515,0,0,0,.515-.515V7.71a.513.513,0,0,1,.514-.514.514.514,0,0,1,.514.514v5.14a1.543,1.543,0,0,1-1.543,1.543Zm1.9-3.11a.515.515,0,0,1-.326-.65l1.028-3.084a.547.547,0,0,1,.123-.2l6.772-6.77A1.949,1.949,0,0,1-2945.574,0a1.967,1.967,0,0,1,1.391.576,1.968,1.968,0,0,1,0,2.783l-6.771,6.772a.533.533,0,0,1-.2.124l-3.085,1.028a.512.512,0,0,1-.161.026A.522.522,0,0,1-2954.563,11.282Z"
                transform="translate(2958)"
                fill="#666"
              />
            </svg>
          </i>
          <span className="text">{formatMessage({ id: 'i18n_eit' })}</span>
        </button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: formatMessage({ id: 'i18n_order_number' }),
      dataIndex: 'order',
      key: 'order',
      render: (_, record, index) => index + (pageIndex - 1) * PAGE_SIZE + 1,
    },
    {
      title: formatMessage({ id: 'i18n_user_name' }),
      dataIndex: 'adminName',
      key: 'adminName',
    },
    {
      title: formatMessage({ id: 'i18n_role_name' }),
      dataIndex: 'roleName',
      key: 'roleName',
      render: (_, record) => (
        <span>
          {record.roleId === ACCOUNT_ROLE_ADMIN
            ? formatMessage({ id: 'i18n_role_admin' })
            : formatMessage({ id: 'i18n_role_manager' })}
        </span>
      ),
    },
    {
      title: formatMessage({ id: 'i18n_sex' }),
      dataIndex: 'sex',
      key: 'sex',
      render: (_, record) => <span>{checkSex(record.sex)}</span>,
    },
    {
      title: formatMessage({ id: 'i18n_phone_number' }),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: formatMessage({ id: 'i18n_email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: formatMessage({ id: 'i18n_created_date' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => formatDatetimeJP(record.createdAt),
    },
    {
      title: formatMessage({ id: 'i18n_status' }),
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <span>
          {record.status === ACCOUNT_ACTIVE ? (
            <>
              <i className={s.activeDot}></i>
              <span>{formatMessage({ id: 'i18n_active' })}</span>
            </>
          ) : (
            <>
              <i className={s.inactiveDot}></i>
              <span>{formatMessage({ id: 'i18n_inactive' })}</span>
            </>
          )}
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, account) => (
        <Dropdown
          overlayClassName="btnSettingTable"
          overlay={menu}
          trigger={['click']}
          className="text-center"
          onClick={() => selectAccount(account)}
        >
          <button className="btn btn-outline btn-blue btn-action">
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={5}
                viewBox="0 0 21 5"
              >
                <g
                  id="Group_10260"
                  data-name="Group 10260"
                  transform="translate(-1290 -213)"
                >
                  <circle
                    id="Ellipse_433"
                    data-name="Ellipse 433"
                    cx="2.5"
                    cy="2.5"
                    r="2.5"
                    transform="translate(1290 213)"
                    fill="#a1a9c9"
                  />
                  <circle
                    id="Ellipse_434"
                    data-name="Ellipse 434"
                    cx="2.5"
                    cy="2.5"
                    r="2.5"
                    transform="translate(1298 213)"
                    fill="#a1a9c9"
                  />
                  <circle
                    id="Ellipse_435"
                    data-name="Ellipse 435"
                    cx="2.5"
                    cy="2.5"
                    r="2.5"
                    transform="translate(1306 213)"
                    fill="#a1a9c9"
                  />
                </g>
              </svg>
            </i>
          </button>
        </Dropdown>
      ),
    },
  ];

  const handleModalAccount = (value, name) => {
    if (name === 'modalView') {
      setModalViewVisible(value);
    } else {
      setModalVisible(value);
    }
  };

  const openEditAccountModal = (value) => {
    setIsModalUpdate(value);
    setModalVisible(true);
  };

  const handleSelectAdminRole = (value) => {
    setAdminRole(value);
    setPageIndex(1);
  };

  const handlePressEnter = () => {
    setTextSearch(textSearchTemp);
    setPageIndex(1);
  };
  useEffect(() => {
    getAccountList();
  }, [getAccountList]);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <section className={s.accountList}>
      <div className={s.titlePageArea}>
        <div className="left">
          <h2 className="heading-3 text-dark mb-0">{headerPage.title}</h2>
        </div>
        <div className="right">
          <button
            className="btn btn-icon btn-yellow btn-add__class"
            onClick={() => openEditAccountModal(false)}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="20.258"
                height="20.258"
                viewBox="0 0 20.258 20.258"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect width="20.258" height="20.258" fill="none" />
                  </clipPath>
                </defs>
                <g
                  id="Group_11253"
                  data-name="Group 11253"
                  transform="translate(-4393.168 -912.427)"
                >
                  <g id="Group_11252" data-name="Group 11252">
                    <g
                      id="Repeat_Grid_68"
                      data-name="Repeat Grid 68"
                      transform="translate(4393.168 912.427)"
                      clipPath="url(#clip-path)"
                    >
                      <g id="Group_10258" data-name="Group 10258">
                        <g id="Group_10255" data-name="Group 10255">
                          <g id="Group_10254" data-name="Group 10254">
                            <path
                              id="Path_18395"
                              data-name="Path 18395"
                              d="M16.64,0H3.617A3.622,3.622,0,0,0,0,3.617V16.64a3.622,3.622,0,0,0,3.617,3.617H16.64a3.622,3.622,0,0,0,3.617-3.617V3.617A3.622,3.622,0,0,0,16.64,0Zm2.17,16.64a2.17,2.17,0,0,1-2.17,2.17H3.617a2.17,2.17,0,0,1-2.17-2.17V3.617a2.17,2.17,0,0,1,2.17-2.17H16.64a2.17,2.17,0,0,1,2.17,2.17Z"
                              fill="#000"
                            />
                          </g>
                        </g>
                        <g
                          id="Group_10257"
                          data-name="Group 10257"
                          transform="translate(5.788 5.788)"
                        >
                          <g id="Group_10256" data-name="Group 10256">
                            <path
                              id="Path_18396"
                              data-name="Path 18396"
                              d="M144.491,140.15H141.6v-2.894a.724.724,0,1,0-1.447,0v2.894h-2.894a.723.723,0,1,0,0,1.447h2.894v2.894a.723.723,0,1,0,1.447,0V141.6h2.894a.723.723,0,1,0,0-1.447Z"
                              transform="translate(-136.533 -136.533)"
                              fill="#000"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <span className="text">
              {formatMessage({ id: 'i18n_account_management' })}
            </span>
          </button>
          <div className="filterArea">
            <Select
              value={adminRole}
              onChange={handleSelectAdminRole}
              className="filter-instructor"
              placeholder={formatMessage({ id: 'i18n_role_name' })}
              allowClear
            >
              <Option value={ACCOUNT_ROLE_ADMIN}>
                {formatMessage({ id: 'i18n_role_admin' })}
              </Option>
              <Option value={ACCOUNT_ROLE_MANAGER}>
                {formatMessage({ id: 'i18n_role_manager' })}
              </Option>
            </Select>
          </div>
          <div className={s.searchField}>
            <Input
              placeholder={formatMessage({ id: 'i18n_search_student' })}
              value={textSearchTemp}
              onChange={(e) => setTextSearchTemp(e.target.value)}
              onPressEnter={handlePressEnter}
            />
            <i></i>
          </div>
        </div>
      </div>
      <div className={s.ClassListMain}>
        <Table
          rowKey="id"
          dataSource={accountList}
          columns={columns}
          bordered
          pagination={{
            onChange: (value) => setPageIndex(value),
            hideOnSinglePage: true,
            defaultPageSize: PAGE_SIZE,
            total,
            current: pageIndex,
            showTotal: (total, range) => {
              return (
                <p className={s.currentAndTotal}>{`${formatMessage({
                  id: 'i18n_means',
                })}: ${
                  PAGE_SIZE * pageIndex < total ? PAGE_SIZE * pageIndex : total
                }/${total}`}</p>
              );
            },
          }}
        />
      </div>
      <ModalViewAccount
        modalVisible={modalViewVisible}
        handleModalAccount={(value) => handleModalAccount(value, 'modalView')}
        openEditAccountModal={openEditAccountModal}
      />
      <ModalAccount
        isModalUpdate={isModalUpdate}
        modalVisible={modalVisible}
        handleModalAccount={handleModalAccount}
      />
    </section>
  );
}
export default connect(({ ACCOUNT }) => ({
  accountStore: ACCOUNT,
}))(AccountList);
