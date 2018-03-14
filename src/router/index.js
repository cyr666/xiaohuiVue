import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import CommonHeader from '@/pages/components/commonHeader'
import IndexContent from '@/pages/indexContent/indexContent'
import RobotContent from '@/pages/robotContent/robotContent'
import BaseSet from '@/pages/robotContent/components/robotright/baseset/BaseSet'
import Question from '@/pages/robotContent/components/robotright/question/Question'
import Recommend from '@/pages/robotContent/components/robotright/recommend/Recommend'
import RecommendAdd from '@/pages/robotContent/components/robotright/recommend/RecommendAdd'
import RecommendEdit from '@/pages/robotContent/components/robotright/recommend/RecommendEdit'
import Skill from '@/pages/robotContent/components/robotright/skill/Skill'
import KBM from '@/pages/robotContent/components/robotright/kbm/KBM'
import kbmAdd from '@/pages/robotContent/components/robotright/kbm/add'
import kbmpvw from '@/pages/robotContent/components/robotright/kbm/kbmPvw'
import kbmEdit from '@/pages/robotContent/components/robotright/kbm/edit'
import solutionpvw from '@/pages/robotContent/components/robotright/solutionset/SolutionPvw'
import SolutionSet from '@/pages/robotContent/components/robotright/solutionset/SolutionSet'
import AccountSet from '@/pages/indexContent/components/indexright/AccountsSet/AccountsSet'
import SystemIndex from '@/pages/indexContent/components/indexright/SystemIndex/SystemIndex'
import ServiceContent from '@/pages/service/ServiceContent'
Vue.use(Router)

export default new Router({
  routes: [
  		{
  			path:'/',
  			name:'Login',
  			component:Login
  		},
    	{
	      path: '/index',
	      //redirect:'/sysindex/system',
	      name: 'CommonHeader',
	      component: CommonHeader,
	      children:[
      							{path: '/sysindex',
      								name: 'IndexContent',
      								component: IndexContent,
      								children:[
      									{
      										path:'/sysindex/system',
      										name:'SystemIndex',
      										component:SystemIndex
      									},
      									{
      										path:'/sysindex/account',
      										name:'AccountSet',
      										component:AccountSet
      									}
      								]
      							},
						      	{
						      		path: '/robot',
						      		redirect:'/robot/baseset',
						      		name: 'RobotContent',
						      		component: RobotContent,
						      		children:[
						      			{
						      				path:'/robot/baseset',
						      				name:'BaseSet',
						      				component:BaseSet
						      			},
						      			{
						      				path:'/robot/question',
						      				name:'Question',
						      				component:Question
						      			},
						      			{
						      				path:'/robot/skill',
						      				name:'Skill',
						      				component:Skill
						      			},
						      			{
						      				path:'/robot/recommend',
						      				name:'Recommend',
						      				component:Recommend
						      			},
						      			{
						      				path:'/robot/recommendadd',
						      				name:'RecommendAdd',
						      				component:RecommendAdd
						      			},
						      			{
						      				path:'/robot/recommendedit',
						      				name:'RecommendEdit',
						      				component:RecommendEdit
						      			},
						      			{
													path: '/robot/kbm',
													name: 'kbm',
													component: KBM,
												},
												{
													path: '/robot/kbmAdd',
													name: 'kbmAdd',
													component: kbmAdd,				
												},
												{
													path:'/robot/kbmEdit',
													name:'kbmEdit',
												  component:kbmEdit					
												},
												{
													path:'/robot/kbmpvw',
													name:'kbmpvw',
												  component:kbmpvw					
												},
						      			{
						      				path:'/robot/solutionset',
						      				name:'SolutionSet',
											    component:SolutionSet					
						      			},
						      			{
						      				path:'/robot/solutionpvw',
						      				name:'solutionpvw',
											    component:solutionpvw					
						      			}
						      		]
						      	},
						      	{
						      		path:'/service',
						      		name:'servicecontent',
						      		component:ServiceContent
						      	}
						      	
						//    	{path: '/index',name: 'IndexContent',component: IndexContent}
						      ]
						    }
						    
  ]
})
