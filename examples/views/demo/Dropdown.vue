 <template>
   <div>
<!--     <Dropdown>-->
<!--       <a href="javascript:void(0)">-->
<!--         下拉菜单-->
<!--         <Icon type="ios-arrow-down"></Icon>-->
<!--       </a>-->
<!--       <DropdownMenu slot="list">-->
<!--         <DropdownItem>驴打滚</DropdownItem>-->
<!--         <DropdownItem>炸酱面</DropdownItem>-->
<!--         <DropdownItem disabled>豆汁儿</DropdownItem>-->
<!--         <DropdownItem>冰糖葫芦</DropdownItem>-->
<!--         <DropdownItem divided>北京烤鸭</DropdownItem>-->
<!--       </DropdownMenu>-->
<!--     </Dropdown>-->
<!--     <Dropdown style="margin-left: 20px">-->
<!--       <Button type="primary">-->
<!--         下拉菜单-->
<!--         <Icon type="ios-arrow-down"></Icon>-->
<!--       </Button>-->
<!--       <DropdownMenu slot="list">-->
<!--         <DropdownItem>驴打滚</DropdownItem>-->
<!--         <DropdownItem>炸酱面</DropdownItem>-->
<!--         <DropdownItem disabled>豆汁儿</DropdownItem>-->
<!--         <DropdownItem>冰糖葫芦</DropdownItem>-->
<!--         <DropdownItem divided>北京烤鸭</DropdownItem>-->
<!--       </DropdownMenu>-->
<!--     </Dropdown>-->
   </div>

 </template>

 <script>
export default {
    name: 'Dropdown',
    props: {
        propName: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        name() {

        }
    },
}
</script>

 <style lang="scss" scoped>

</style>
