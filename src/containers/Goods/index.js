import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchGoods,
  addGood
} from '../../actions/index';
import Panel from '../../components/Panel';
import {
  Table,
  Button,
  Divider,
  Modal
} from 'antd';
import UpdateGoodModal from './UpdateGoodModal';
import AddGoodModal from './AddGoodModal';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    isFetching: state.goods.isFetching,
    goods: state.goods.goods,
    total: state.goods.total,
    pageNum: state.goods.pageNum,
    message: state.goods.message,
    isUploading: state.goods.isUploading
  }),
  dispatch => ({
    fetchGoods: (adminId, token, pageNum) => dispatch(fetchGoods(adminId, token, pageNum)),
    createGood: (adminId, token, good) => dispatch(addGood(adminId, token, good))
  })
)
export default class Goods extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    addFormVisible: false,
    updateFormVisible: false,
    updateForm: null
  }

  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    goods: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    pageNum: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    isUploading: PropTypes.bool.isRequired,
    fetchGoods: PropTypes.func.isRequired,
    createGood: PropTypes.func.isRequired
  }

  componentDidMount() {
    const {
      adminId,
      token,
      pageNum
    } = this.props

    // fetch good information
    this.props.fetchGoods(adminId, token, pageNum)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  handlePageChange = (pageNum) => {
    const {
      adminId,
      token
    } = this.props

    this.props.fetchGoods(adminId, token, pageNum)
  }

  handleAddModalShow = () => {
    this.setState({
      addFormVisible: true
    })
  }

  handleUpdateModalShow = (record) => {
    this.setState({
      updateForm: record,
      updateFormVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      addFormVisible: false,
      updateFormVisible: false
    })
  }

  handleCreate = (e) => {
    e.preventDefault()
    const form = this.form

    form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return ;
      }

      this.props.createGood(
        this.props.adminId,
        this.props.token,
        values
      )

      if (this.props.isUploading === false) {
        this.setState({
          addFormVisible: false
        })
      }
    })
  }

  saveFormRef = (form) => {
    this.form = form
  }

  render() {
    const {
      isFetching,
      goods,
      pageNum,
      total
    } = this.props

    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'goodId',
      key: 'goodId',
      sorter: (a, b) => a.goodId - b.goodId,
      sortOrder: sortedInfo.columnKey === 'goodId' && sortedInfo.order
    }, {
      title: '商品名称',
      dataIndex: 'goodName',
      key: 'goodName'
    }, {
      title: '图片',
      dataIndex: 'image',
      key: 'image'
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order
    }, {
      title: '原价',
      dataIndex: 'originalPrice',
      key: 'originalPrice'
    }, {
      title: '库存',
      dataIndex: 'inventory',
      key: 'inventory'
    }, {
      title: '已售',
      dataIndex: 'soldCount',
      key: 'soldCount'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary">
            出库
          </Button>
          <Divider type="vertical" />
          <Button type="danger">
            入库
          </Button>
          <Divider />
          <Button
            type="primary"
            onClick={() => this.handleUpdateModalShow(record)}
          >
            更新
          </Button>
          <Divider type="vertical" />
          <Button
            type="danger"
          >
            下架
          </Button>
        </span>
      )
    }]

    const columns2 = [{
      title: '分类id',
      dataIndex: 'categoryId',
      key: 'categoryId'
    }, {
      title: '分类名称',
      dataIndex: 'category.categoryName',
      key: 'categoryName'
    }, {
      title: '规格',
      dataIndex: 'spec',
      key: 'spec'
    }, {
      title: '原产地',
      dataIndex: 'origin',
      key: 'origin'
    }]

    return (
      <Panel>
        <Panel.Header>
          <Button
            type="primary"
            onClick={this.handleAddModalShow}
          >
            新增商品
          </Button>
        </Panel.Header>
        <Panel.Body>
          <Table
            rowKey={record => record.goodId}
            dataSource={goods}
            columns={columns}
            loading={isFetching}
            bordered
            onChange={this.handleChange}
            pagination = {
              {
                defaultCurrent: pageNum,
                total,
                onChange: this.handlePageChange
              }
            }
            expandedRowRender={(record, index) => {
              const array = [record]
              return (
                <Table
                  rowKey={record => record.goodId}
                  pagination={false}
                  dataSource={array}
                  columns={columns2}
                />
              )
            }}
          />
          <AddGoodModal
            ref={this.saveFormRef}
            visible={this.state.addFormVisible}
            isUploading={this.props.isUploading}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleCreate}
          />
          <UpdateGoodModal
            visible={this.state.updateFormVisible}
            updateForm={this.state.updateForm}
            handleCancel={this.handleCancel}
          />
        </Panel.Body>
      </Panel>
    )
  }
}
