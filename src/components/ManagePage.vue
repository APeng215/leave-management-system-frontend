<script>
import FetchHelper from '../js/util/FetchHelper';
import { excelParser } from '../js/util/excel-parser'
export default {
    mounted() {
        this.requestLeaveInfos();
        this.requestUserInfo();
    },
    data() {
        return {
            filter: "",
            test: 1,
            user: {
                name: null,
                username: null,
                id: null,
                sex: null,
                department: null,
                duty: null,

            },
            leaveRequest: {
                type: null,
                startDate: null, // Add a property to store the start date
                endDate: null,   // Add a property to store the end date
                duration: 0,
                reason: null
            },
            leaveRequestTable: {
                fields: [
                    { key: "name", label: "申请人", sortable: true },
                    { key: "username", label: "学号/工号", sortable: true },
                    { key: "type", label: "请假类型", sortable: true },
                    { key: "beginDate", label: "开始日期", sortable: true },
                    { key: "endDate", label: "结束日期", sortable: true },
                    { key: "reason", label: "请假原因", sortable: true },
                    { key: "approvalStatus", label: "审批状态", sortable: true },
                    { key: "createTime", label: "创建时间", sortable: true },
                    { key: "updateTime", label: "更新时间", sortable: true },
                    { key: "operation", label: "操作", sortable: true }
                ],
                items: []
            }
        };
    },
    methods: {
        exportXls() {
            excelParser().exportDataFromJSON(this.leaveRequestTable.items, "请假表", "xls");
        },
        clearFilter() {
            this.filter = "";
        },
        async requestReject(event) {
            const targetUsername = event.currentTarget.getAttribute("data-username");
            const result = await FetchHelper.fetch("POST", "/requestLeaveOperation", {
                operation: "REJECT",
                targetUsername: targetUsername
            });
            this.requestLeaveInfos();
        },
        async requestRevoke(event) {
            const targetUsername = event.currentTarget.getAttribute("data-username");
            const result = await FetchHelper.fetch("POST", "/requestLeaveOperation", {
                operation: "REVOKE",
                targetUsername: targetUsername
            });
            this.requestLeaveInfos();
        },
        async requestApprove(event) {
            const targetUsername = event.currentTarget.getAttribute("data-username");
            const result = await FetchHelper.fetch("POST", "/requestLeaveOperation", {
                operation: "APPROVE",
                targetUsername: targetUsername
            });
            this.requestLeaveInfos();
        },
        async requestUserInfo() {
            const result = await FetchHelper.fetch("GET", "/requestUserInfo");
            this.user = result;
        },
        calculateDuration() {
            // Get the selected start and end dates from the input fields
            var start = new Date(this.leaveRequest.startDate);
            var end = new Date(this.leaveRequest.endDate);

            // Check if endDate is before startDate
            if (end < start) {
                this.leaveRequest.endDate = this.leaveRequest.startDate; // Reset endDate to be the same as startDate
                start = new Date(this.leaveRequest.startDate);
                end = new Date(this.leaveRequest.endDate);
            }

            // Calculate the difference in days
            const timeDiff = end.getTime() - start.getTime();
            const daysDiff = timeDiff / (1000 * 3600 * 24);

            // Update the duration in the data
            this.leaveRequest.duration = daysDiff + 1;
        },
        async requestLeaveInfos() {
            const result = await FetchHelper.fetch("GET", "/requestLeaveInfo");
            this.leaveRequestTable.items = [];
            for (let item of result) {
                this.leaveRequestTable.items.push(item);
            }
        },
        async submitLeaveRequest() {
            // Close modal
            this.$refs.modalCloseButton.click();
            // Send logging information
            const result = await FetchHelper.fetch("POST", "/leaveRequest", this.leaveRequest);
            this.requestLeaveInfos();
        },
        async modifyLeaveRequest() {
            // Close modal
            this.$refs.modalCloseButton2.click();
            // Send logging information
            const result = await FetchHelper.fetch("POST", "/modifyRequest", this.leaveRequest);
            this.requestLeaveInfos();
        },

    }
}
</script>
<style scoped>
.white-background {
    background-color: #ffffff;
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    /* White color */
}

html {
    padding-top: 50px;
    background: url("/static/login-background.jpg");
    background-attachment: fixed;
}
</style>


<template>
    <div class="d-flex justify-content-center align-items-center flex-column space manage-root">
        <div class="d-flex justify-content-center align-items-center flex-column">

            <div class="p-3 border border-primary rounded d-flex flex-column white-background shadow">
                <div class="mb-3 d-flex justify-content-between align-items-center">

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal"
                        data-bs-target="#leaveRequest">
                        申请请假 <i class="bi bi-plus-circle"></i>
                    </button>
                    <div class="input-group w-25">
                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i>&nbsp;搜索</span>
                        <input type="text" class="form-control" placeholder="请输入" aria-label="Username"
                            aria-describedby="basic-addon1" v-model="filter">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" :disabled="filter == ''"
                            @click="clearFilter">清空</button>
                    </div>
                    <!-- <div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault1">
                            <label class="form-check-label" for="flexSwitchCheckDefault1">只显示待审批请假</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault2">
                            <label class="form-check-label" for="flexSwitchCheckDefault2">只显示自己的请假</label>
                        </div>
                    </div> -->

                    <button type="button" class="btn btn-success" @click="exportXls">导出请假表 <i
                            class="bi bi-box-arrow-down"></i></button>

                    <!-- Modal For Submit -->
                    <div class="modal fade" id="leaveRequest" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true" ref="leaveRequestModal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">请假申请</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="" id="requestForm" @submit.prevent="submitLeaveRequest">
                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="inputRequestType">请假类型</label>
                                            <select class="form-select" id="inputRequestType" name="requestType"
                                                v-model="leaveRequest.type" required>
                                                <option option selected disabled>选择请假类型</option>
                                                <option value="病假">病假</option>
                                                <option value="事假">事假</option>
                                            </select>
                                        </div>

                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="inputRequestBeginDate">请假开始日期</label>
                                            <input type="date" class="form-control" id="inputRequestBeginDate"
                                                name="requestBeginDate" v-model="leaveRequest.startDate"
                                                @input="calculateDuration" required>
                                        </div>

                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="inputRequestEndDate">请假结束日期</label>
                                            <input type="date" class="form-control" id="inputRequestEndDate"
                                                name="requestEndDate" v-model="leaveRequest.endDate"
                                                @input="calculateDuration" required>
                                        </div>

                                        <div class="input-group mb-3">
                                            <label class="input-group-text">请假时长</label>
                                            <input type="text" class="input-group-text" readonly
                                                :value="this.leaveRequest.duration">
                                            <span class="input-group-text">天</span>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-text">请假原因</span>
                                            <textarea class="form-control" v-model="leaveRequest.reason"
                                                required></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                        ref="modalCloseButton">取消</button>
                                    <button type="submit" form="requestForm" class="btn btn-primary">提交申请</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal For Modify -->
                    <div class="modal fade" id="modifyRequest" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true" ref="leaveRequestModal">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">请假申请</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="" id="modifyForm" @submit.prevent="modifyLeaveRequest">
                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="inputRequestType">请假类型</label>
                                            <select class="form-select" id="inputRequestType" name="requestType"
                                                v-model="leaveRequest.type" required>
                                                <option option selected disabled>选择请假类型</option>
                                                <option value="病假">病假</option>
                                                <option value="事假">事假</option>
                                            </select>
                                        </div>

                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="inputRequestBeginDate">请假开始日期</label>
                                            <input type="date" class="form-control" id="inputRequestBeginDate"
                                                name="requestBeginDate" v-model="leaveRequest.startDate"
                                                @input="calculateDuration" required>
                                        </div>

                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="inputRequestEndDate">请假结束日期</label>
                                            <input type="date" class="form-control" id="inputRequestEndDate"
                                                name="requestEndDate" v-model="leaveRequest.endDate"
                                                @input="calculateDuration" required>
                                        </div>

                                        <div class="input-group mb-3">
                                            <label class="input-group-text">请假时长</label>
                                            <input type="text" class="input-group-text" readonly
                                                :value="this.leaveRequest.duration">
                                            <span class="input-group-text">天</span>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-text">请假原因</span>
                                            <textarea class="form-control" v-model="leaveRequest.reason"
                                                required></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                        ref="modalCloseButton2">取消</button>
                                    <button type="submit" form="modifyForm" class="btn btn-primary">修改申请</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Table -->
                <div class="">
                    <b-table responsive bordered striped hover :fields="leaveRequestTable.fields"
                        :items="leaveRequestTable.items" label-sort-asc="" label-sort-desc="" label-sort-clear=""
                        stacked="sm" :filter="filter">
                        <template #cell(operation)="data">
                            <button class="btn btn-success mx-1" :data-username="data.item.username"
                                v-if="user.duty == '辅导员' && data.item.approvalStatus == '待审批'"
                                @click="requestApprove($event)">
                                批准 <i class="bi bi-check2-circle"></i>
                            </button>
                            <button class="btn btn-danger mx-1" :data-username="data.item.username"
                                v-if="user.duty == '辅导员' && data.item.approvalStatus == '待审批'"
                                @click="requestReject($event)">
                                拒绝 <i class="bi bi-x-circle"></i>
                            </button>
                            <button class="btn btn-success mx-1" :data-username="data.item.username"
                                v-if="user.duty == '辅导员' && data.item.approvalStatus == '已批准'" disabled>
                                已批准
                            </button>
                            <button class="btn btn-danger mx-1" :data-username="data.item.username"
                                v-if="user.duty == '辅导员' && data.item.approvalStatus == '已拒绝'" disabled>
                                已拒绝
                            </button>
                            <button class="btn btn-warning mx-1" :data-username="data.item.username"
                                v-if="user.username == data.item.username && data.item.approvalStatus != '已批准'"
                                data-bs-toggle="modal" data-bs-target="#modifyRequest">
                                修改 <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-danger mx-1" :data-username="data.item.username"
                                v-if="user.username == data.item.username" @click="requestRevoke($event)">
                                撤销 <i class="bi bi-backspace"></i>
                            </button>
                        </template>
                    </b-table>

                </div>
            </div>
        </div>

    </div>
</template>