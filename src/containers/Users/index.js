import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '../../components/Panel';
import {
  Table,
  Button,
  Divider,
  Spin
} from 'antd';
import {
  fetchUsers
} from '../../actions';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    isFetching: state.users.isFetching,
    users: state.users.users
  }),
  dispatch => ({
    fetchUsers: (adminId, token) => {
      dispatch(fetchUsers(adminId, token))
    }
  })
)
export default class Users extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  }

  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUsers(this.props.adminId, this.props.token)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  render() {
    const {
      isFetching
    } = this.props

    let { users } = this.props
    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order
    }, {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName'
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      filters: [
        { text: '男', value: 'MAN' },
        { text: '女', value: 'WOMAN' }
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, recored) => recored.sex === value
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary">
            修改信息
          </Button>
          <Divider type="vertical" />
          <Button type="danger">
            修改密码
          </Button>
        </span>
      )
    }]

    return (
      <Panel>
        <Panel.Body>
          <Table
            rowKey={record => record.userId}
            dataSource={users}
            columns={columns}
            loading={isFetching}
            bordered
            onChange={this.handleChange}
          />
        </Panel.Body>
      </Panel>
    )
  }
}
