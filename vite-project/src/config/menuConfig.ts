const menuList = [
  {
    title:"首页",
    index:"/home",
    icon:"sy",
    isPublic:true,
  },
  {
    title:"用户管理",
    index:"/user",
    icon:"yh"
  },
  {
      title: '角色管理',
      index: '/role',
      icon: 'js',
  },
  {
      title: '学员',
      index: '/students',
      icon: 'xy',
      children: [ // 子菜单列表
          {
              title: '学校管理',
              index: '/school',
              icon: 'xx'
          },
          {
              title: '专业管理',
              index: '/majors',
              icon: 'zy'
          },
          {
              title: '班级管理',
              index: '/class',
              icon: 'bj'
          },
          {
              title: '学生管理',
              index: '/student',
              icon: 'xs'
          },

      ]
  },

]
export default menuList