﻿#pragma checksum "..\..\MainWindow.xaml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "5A507A8B00ABFD2A78C974470D3BB972A2210E5ED68E7500C9A7B2C29364CAE7"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using Adatkarbantartas;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace Adatkarbantartas {
    
    
    /// <summary>
    /// MainWindow
    /// </summary>
    public partial class MainWindow : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 18 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.DockPanel TopPanel;
        
        #line default
        #line hidden
        
        
        #line 19 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.DockPanel BottomPanel;
        
        #line default
        #line hidden
        
        
        #line 20 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.DockPanel MiddlePanel;
        
        #line default
        #line hidden
        
        
        #line 33 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image Products;
        
        #line default
        #line hidden
        
        
        #line 34 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image Orders;
        
        #line default
        #line hidden
        
        
        #line 35 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image Comments;
        
        #line default
        #line hidden
        
        
        #line 36 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image Categories;
        
        #line default
        #line hidden
        
        
        #line 37 "..\..\MainWindow.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image Users;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/Adatkarbantartas;component/mainwindow.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\MainWindow.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            this.TopPanel = ((System.Windows.Controls.DockPanel)(target));
            return;
            case 2:
            this.BottomPanel = ((System.Windows.Controls.DockPanel)(target));
            return;
            case 3:
            this.MiddlePanel = ((System.Windows.Controls.DockPanel)(target));
            return;
            case 4:
            this.Products = ((System.Windows.Controls.Image)(target));
            
            #line 33 "..\..\MainWindow.xaml"
            this.Products.MouseEnter += new System.Windows.Input.MouseEventHandler(this.Products_MouseEnter);
            
            #line default
            #line hidden
            
            #line 33 "..\..\MainWindow.xaml"
            this.Products.MouseLeave += new System.Windows.Input.MouseEventHandler(this.Products_MouseLeave);
            
            #line default
            #line hidden
            return;
            case 5:
            this.Orders = ((System.Windows.Controls.Image)(target));
            
            #line 34 "..\..\MainWindow.xaml"
            this.Orders.MouseEnter += new System.Windows.Input.MouseEventHandler(this.Orders_MouseEnter);
            
            #line default
            #line hidden
            
            #line 34 "..\..\MainWindow.xaml"
            this.Orders.MouseLeave += new System.Windows.Input.MouseEventHandler(this.Orders_MouseLeave);
            
            #line default
            #line hidden
            return;
            case 6:
            this.Comments = ((System.Windows.Controls.Image)(target));
            
            #line 35 "..\..\MainWindow.xaml"
            this.Comments.MouseEnter += new System.Windows.Input.MouseEventHandler(this.Comments_MouseEnter);
            
            #line default
            #line hidden
            
            #line 35 "..\..\MainWindow.xaml"
            this.Comments.MouseLeave += new System.Windows.Input.MouseEventHandler(this.Comments_MouseLeave);
            
            #line default
            #line hidden
            return;
            case 7:
            this.Categories = ((System.Windows.Controls.Image)(target));
            
            #line 36 "..\..\MainWindow.xaml"
            this.Categories.MouseEnter += new System.Windows.Input.MouseEventHandler(this.Categories_MouseEnter);
            
            #line default
            #line hidden
            
            #line 36 "..\..\MainWindow.xaml"
            this.Categories.MouseLeave += new System.Windows.Input.MouseEventHandler(this.Categories_MouseLeave);
            
            #line default
            #line hidden
            return;
            case 8:
            this.Users = ((System.Windows.Controls.Image)(target));
            
            #line 37 "..\..\MainWindow.xaml"
            this.Users.MouseEnter += new System.Windows.Input.MouseEventHandler(this.Users_MouseEnter);
            
            #line default
            #line hidden
            
            #line 37 "..\..\MainWindow.xaml"
            this.Users.MouseLeave += new System.Windows.Input.MouseEventHandler(this.Users_MouseLeave);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
    }
}

